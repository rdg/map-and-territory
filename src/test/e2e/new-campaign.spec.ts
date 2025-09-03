import { test, expect } from '@playwright/test';

test('New Campaign creates empty project and allows spaces in name', async ({ page }) => {
  await page.goto('/');

  // Click New campaign button in toolbar
  await page.getByRole('button', { name: 'New' }).click();

  // Header shows campaign name
  await expect(page.getByRole('banner')).toContainText('Untitled Campaign');

  // Properties panel should show Campaign properties
  const nameInput = page.getByRole('textbox', { name: 'Campaign Name' });
  await expect(nameInput).toBeVisible();

  // Type a name with spaces
  await nameInput.fill('My First Campaign');

  // Header updates
  await expect(page.getByRole('banner')).toContainText('My First Campaign');

  // Description textarea accepts text
  const desc = page.getByRole('textbox', { name: 'Campaign Description' });
  await desc.fill('Some long description with spaces.');
  await expect(desc).toHaveValue('Some long description with spaces.');
});

