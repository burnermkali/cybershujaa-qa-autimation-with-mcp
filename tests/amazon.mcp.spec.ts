import { test, expect } from '@playwright/test';

// MCP-authored flow: search → results → open PDP → add to cart → cart → proceed to checkout
// Notes:
// - Runs headed by default (see playwright.config.ts)
// - Uses robust waits (expect.poll) and fallbacks for modal/variant flows
// - Exits at sign-in page after clicking Proceed to checkout

test('MCP Amazon checkout path', async ({ page }) => {
  test.setTimeout(120000);
  // Open Amazon with lightweight retry to absorb transient network changes
  {
    let lastError: unknown;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await page.goto('https://www.amazon.com', { waitUntil: 'domcontentloaded' });
        break;
      } catch (err) {
        lastError = err;
        if (attempt === 3) throw err;
        await page.waitForTimeout(1500);
      }
    }
  }

  // Dismiss region modal if present
  const regionDismiss = page.getByRole('button', { name: /dismiss/i }).first();
  if (await regionDismiss.isVisible()) await regionDismiss.click().catch(() => { });

  // Handle common interstitial buttons
  const interstitialButton = page.getByRole('button', { name: /(continue shopping|stay on.*site|go to.*site|not now|continue)/i }).first();
  if (await interstitialButton.isVisible()) await interstitialButton.click().catch(() => { });

  // Skip if CAPTCHA wall appears
  const captchaWall = page.getByText(/enter the characters you see/i).first();
  if (await captchaWall.isVisible()) test.skip(true, 'CAPTCHA detected; skipping test to avoid false negatives.');

  // Handle cookie banner if present (EU/UK)
  const acceptCookies = page.locator('#sp-cc-accept, input[name="accept"]:visible').first();
  if (await acceptCookies.isVisible()) await acceptCookies.click().catch(() => { });

  // Perform search with resilient selector strategy
  const searchCandidate = page.locator('input#twotabsearchtextbox, input[aria-label*="Search" i], input[name="field-keywords"]').first();
  await searchCandidate.waitFor({ state: 'visible', timeout: 30000 });
  await searchCandidate.click();
  await searchCandidate.fill('wireless headphones');
  await page.keyboard.press('Enter');
  // Fallback: if search results don't load, navigate directly to results URL
  try {
    await Promise.race([
      page.waitForURL(/\/s\?/i, { timeout: 8000 }),
      page.waitForSelector('.s-main-slot [data-component-type="s-search-result"] h2 a', { timeout: 8000 })
    ]);
  } catch {
    await page.goto('https://www.amazon.com/s?k=wireless+headphones', { waitUntil: 'domcontentloaded' });
  }

  // Skip if CAPTCHA after navigation to results
  if (await captchaWall.isVisible()) test.skip(true, 'CAPTCHA after search; skipping.');

  // Wait for results to hydrate
  const resultLinks = page.locator('.s-main-slot [data-component-type="s-search-result"] h2 a, a.a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal');
  await expect.poll(async () => await resultLinks.count(), {
    timeout: 30000,
    message: 'Waiting for search results to appear',
  }).toBeGreaterThan(0);

  // Open the first result PDP
  const firstProductLink = resultLinks.first();
  await firstProductLink.scrollIntoViewIfNeeded();
  await firstProductLink.click();

  // Skip if CAPTCHA on PDP
  if (await captchaWall.isVisible()) test.skip(true, 'CAPTCHA on PDP; skipping.');

  // Try add to cart path variants
  const addToCart = page.getByRole('button', { name: /add to cart|add to basket/i }).first();
  const addToCartVisible = await addToCart.isVisible();
  if (addToCartVisible) {
    await addToCart.click();
  } else {
    const buyingOptions = page.getByRole('button', { name: /see all buying options/i }).first();
    if (await buyingOptions.isVisible()) {
      await buyingOptions.click();
      const addFromPane = page.getByRole('button', { name: /add to cart/i }).first();
      await expect(addFromPane).toBeVisible();
      await addFromPane.click();
    } else {
      test.skip(true, 'Item lacks direct add-to-cart; skipping.');
    }
  }

  // Dismiss protection/warranty modal if shown
  const noThanks = page.getByRole('button', { name: /no thanks|skip|continue without protection/i }).first();
  if (await noThanks.isVisible()) await noThanks.click().catch(() => { });

  // Navigate to Cart
  const cartLink = page.getByRole('link', { name: /^cart$|\bcart\b/i }).first();
  if (await cartLink.isVisible()) {
    await cartLink.click();
  } else {
    await page.click('#nav-cart');
  }
  await expect(page).toHaveURL(/\/cart/);

  // Proceed to checkout
  const proceedBtn = page.getByRole('button', { name: /proceed to checkout/i }).first();
  await expect(proceedBtn).toBeVisible();
  await proceedBtn.click();

  // Expect sign-in prompt
  await expect(page.locator('h1, h2')).toContainText(/sign[- ]?in|sign in/i);
});
