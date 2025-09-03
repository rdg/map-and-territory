import { test, expect } from '@playwright/test';

test('Map CRUD MVP: add, rename, delete', async ({ page }) => {
  await page.goto('/');
  // Ensure a campaign exists
  await page.getByRole('button', { name: /new campaign/i }).or(page.getByRole('button', { name: 'New' })).first().click();

  // Add a map via toolbar button (scene group)
  await page.getByRole('button', { name: /new map/i }).or(page.getByRole('button', { name: 'New Map' })).first().click();

  // Sidebar lists the new map
  await expect(page.getByText('Untitled Map')).toBeVisible();

  // Select the map and edit title/description in properties
  await page.getByText('Untitled Map').click();
  const mapTitle = page.getByRole('textbox', { name: 'Map Title' });
  await expect(mapTitle).toBeVisible();
  await mapTitle.fill('World Map 1');
  await expect(page.getByText('World Map 1')).toBeVisible();

  const mapDesc = page.getByRole('textbox', { name: 'Map Description' });
  await mapDesc.fill('Test description');
  await expect(mapDesc).toHaveValue('Test description');

  // Delete via sidebar button (confirm dialog)
  // Toggle visibility button should be present and toggles aria-label
  const visBtn = page.getByRole('button', { name: 'Hide Map' });
  await expect(visBtn).toBeVisible();
  await visBtn.click();
  await expect(page.getByRole('button', { name: 'Show Map' })).toBeVisible();

  page.once('dialog', (dialog) => dialog.accept());
  await page.getByRole('button', { name: 'Delete Map' }).click();
  await expect(page.getByText('World Map 1')).toHaveCount(0);
});
