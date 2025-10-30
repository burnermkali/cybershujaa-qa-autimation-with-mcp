import { test, expect } from '@playwright/test';

// MCP-authored flow: search → results → open PDP → add to cart → cart → proceed to checkout
// Notes:
// - Runs headed by default (see playwright.config.ts)
// - Uses robust waits (expect.poll) and fallbacks for modal/variant flows
// - Exits at sign-in page after clicking Proceed to checkout

test('MCP Amazon checkout path', async ({ page }) => {
  // Open Amazon
  await page.goto('https://www.amazon.com', { waitUntil: 'domcontentloaded' });

  // Dismiss region modal if present
  const regionDismiss = page.getByRole('button', { name: /dismiss/i }).first();
  if (await regionDismiss.isVisible()) await regionDismiss.click().catch(() => {});

  // Skip if CAPTCHA wall appears
  const captchaWall = page.getByText(/enter the characters you see/i).first();
  if (await captchaWall.isVisible()) test.skip('CAPTCHA detected; skipping test to avoid false negatives.');

  // Perform search
  const searchbox = page.getByRole('searchbox', { name: /search amazon/i });
  await searchbox.click();
  await page.keyboard.type('wireless headphones', { delay: 40 });
  await page.keyboard.press('Enter');

  // Wait for results to hydrate
  const resultLinks = page.locator('.s-main-slot [data-component-type="s-search-result"] h2 a');
  await expect.poll(async () => await resultLinks.count(), {
    timeout: 30000,
    message: 'Waiting for search results to appear',
  }).toBeGreaterThan(0);

  // Open the first result PDP
  const firstProductLink = resultLinks.first();
  await firstProductLink.scrollIntoViewIfNeeded();
  await firstProductLink.click();

  // Skip if CAPTCHA on PDP
  if (await captchaWall.isVisible()) test.skip('CAPTCHA on PDP; skipping.');

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
      test.skip('Item lacks direct add-to-cart; skipping.');
    }
  }

  // Dismiss protection/warranty modal if shown
  const noThanks = page.getByRole('button', { name: /no thanks|skip|continue without protection/i }).first();
  if (await noThanks.isVisible()) await noThanks.click().catch(() => {});

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
