import { expect, test } from '@playwright/test';
import { randomUUID } from 'node:crypto';

test('Create a new post', async ({ page }) => {
  const author = randomUUID();

  await page.goto('');

  await expect(page.getByRole('heading', { name: 'Posts' })).toBeVisible();

  await page.getByRole('button', { name: 'Create Post' }).click();

  await expect(page.getByText('Ready to create your Post?')).toBeVisible();

  await page
    .getByLabel('Title')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    );

  await page.getByLabel('Author').fill(author);

  await page.getByLabel('Post content').fill(
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
      anim id est laborum.`,
  );

  await page.getByRole('button', { name: 'save' }).click();

  await expect(page.getByText(author)).toBeVisible();
});
