import { test, expect } from '@playwright/test';

// YouTube search
test('YouTube search', async ({ page }) => {
    await page.goto('https://www.youtube.com/');
    await page.getByRole('combobox', { name: 'Search' }).fill('how to use playwright mcp with vs code');
    await page.getByRole('combobox', { name: 'Search' }).press('Enter');
    await page.locator('ytd-video-renderer').filter({ hasText: 'Playwright MCP Server: Installing and getting started in VS Code 🎭🤖 Execute' }).getByLabel('Action menu').click();
    await page.getByTitle('Playwright MCP Server: Installing and getting started in VS Code 🎭🤖').click();
    await page.goto('https://www.youtube.com/');
    await page.getByRole('combobox', { name: 'Search' }).click();
    await page.getByRole('combobox', { name: 'Search' }).fill('mcp.json files in vs code');
    await page.getByRole('button', { name: 'vscode' }).click();
    await page.getByTitle('Setup MCP Servers in VS Code').click();
    await page.getByText('Setup MCP Servers in VS Code in Seconds #vscode #githubcopilot #mcpTap to').click();
    await page.getByRole('link', { name: 'YouTube Home' }).click();
    await page.getByRole('combobox', { name: 'Search' }).dblclick();
    await page.getByRole('combobox', { name: 'Search' }).fill('UAT testing');
    await page.getByRole('combobox', { name: 'Search' }).press('Enter');
    await page.getByTitle('The Software Testing Process: What is User Acceptance Testing - UAT?').click();
    await page.getByTitle('The Software Testing Process: What is User Acceptance Testing - UAT?').click();
});