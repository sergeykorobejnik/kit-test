import { expect, test } from '@playwright/test';

test('Check base page layout', async ({ page }) => {
  await page.goto('');

  await expect(page.getByRole('heading', { name: 'Posts' })).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Posts' })).toBeVisible();

  await expect(page.getByRole('button', { name: 'Create Post' })).toBeVisible();

  await expect(page.getByRole('button', { name: 'Sort by:' })).toBeVisible();
});

test('Check redirect to post detail page', async ({ page }) => {
  await page.goto('');

  await expect(page.getByRole('heading', { name: 'Posts' })).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Posts' })).toBeVisible();

  await expect(page.getByRole('button', { name: 'Create Post' })).toBeVisible();

  await expect(page.getByRole('button', { name: 'Sort by:' })).toBeVisible();

  await expect(page.getByTestId('posts-list')).toBeVisible();
});
