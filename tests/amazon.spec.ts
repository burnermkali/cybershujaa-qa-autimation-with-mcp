import { test, expect } from '@playwright/test';

// Amazon Search Demo - Add to cart and reach checkout button
test('Amazon search - add to cart and reach checkout', async ({ page }) => {
  await page.goto('https://www.amazon.com', { waitUntil: 'domcontentloaded' });

  const regionDismiss = page.getByRole('button', { name: /dismiss/i }).first();
  if (await regionDismiss.isVisible()) await regionDismiss.click().catch(() => {});

  const searchbox = page.getByRole('searchbox', { name: /search amazon/i });
  await searchbox.click();
  await page.keyboard.type('wireless headphones', { delay: 40 });
  await page.keyboard.press('Enter');

  // Wait for results or captcha
  const captchaWall = page.getByText(/enter the characters you see/i).first();
  if (await captchaWall.isVisible()) test.skip('CAPTCHA detected; skipping.');

  const resultLinks = page.locator('.s-main-slot [data-component-type="s-search-result"] h2 a');
  await expect.poll(async () => await resultLinks.count(), { timeout: 30000 }).toBeGreaterThan(0);

  const firstProductLink = resultLinks.first();
  await firstProductLink.scrollIntoViewIfNeeded();
  await firstProductLink.click();

  if (await captchaWall.isVisible()) test.skip('CAPTCHA on PDP; skipping.');

  // Add to cart
  const addToCartBtn = page.getByRole('button', { name: /add to cart|add to basket/i }).first();
  if (await addToCartBtn.isVisible()) {
    await addToCartBtn.click();
  } else {
    const buyingOptions = page.getByRole('button', { name: /see all buying options/i }).first();
    if (await buyingOptions.isVisible()) {
      await buyingOptions.click();
      const addFromPane = page.getByRole('button', { name: /add to cart/i }).first();
      await addFromPane.click();
    } else {
      test.skip('No add to cart available for this item');
    }
  }

  // Dismiss protection modal if appears
  const noThanks = page.getByRole('button', { name: /no thanks|skip|continue without protection/i }).first();
  if (await noThanks.isVisible()) await noThanks.click().catch(() => {});

  // Go to cart
  const cartLink = page.getByRole('link', { name: /^cart$|\bcart\b/i }).first();
  if (await cartLink.isVisible()) {
    await cartLink.click();
  } else {
    // Fallback: click cart icon in navbar
    await page.click('#nav-cart');
  }

  await expect(page).toHaveURL(/\/cart/);

  // Proceed to checkout should be present
  const proceedBtn = page.getByRole('button', { name: /proceed to checkout/i }).first();
  await expect(proceedBtn).toBeVisible();
  await proceedBtn.click();

  // Expect sign-in page after clicking checkout
  await expect(page.locator('h1, h2')).toContainText(/sign[- ]?in|sign in/i);
});
