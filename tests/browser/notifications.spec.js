import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('./');
	// This control appears in onMount, so interactions wait for hydration.
	await page.getByRole('button', { name: /Activate .* mode/ }).waitFor();
});

test('creates, stacks and closes notifications without page errors', async ({ page }) => {
	/** @type {string[]} */
	const errors = [];
	page.on('pageerror', (error) => errors.push(error.message));
	await page.getByLabel('Auto Dismissible').uncheck();
	await page.getByLabel('Title', { exact: true }).fill('Saved');
	await page.getByRole('button', { name: 'Show Notification' }).click();
	await page.getByRole('button', { name: 'Show Notification' }).click();
	await expect(page.locator('.notification-container')).toHaveCount(2);
	await page.getByRole('button', { name: 'Close', exact: true }).first().click();
	await expect(page.locator('.notification-container')).toHaveCount(1);
	await expect(page.locator('.notification-container')).toContainText('Saved');
	expect(errors).toEqual([]);
});

test('auto dismissal respects duration and shows the countdown', async ({ page }) => {
	await page.getByLabel('Countdown Duration (ms)').fill('700');
	await page.getByRole('button', { name: 'Show Notification' }).click();
	await expect(page.locator('.countdown')).toBeVisible();
	await expect(page.locator('.notification-container')).toHaveCount(1);
	await expect(page.locator('.notification-container')).toHaveCount(0, { timeout: 4000 });
});

test('persistent notification has no close button or countdown when disabled', async ({ page }) => {
	await page.getByLabel('Auto Dismissible').uncheck();
	await page.getByLabel('Show Close Button').uncheck();
	await page.getByRole('button', { name: 'Show Notification' }).click();
	await expect(page.locator('.notification-container')).toBeVisible();
	await expect(page.getByRole('button', { name: 'Close', exact: true })).toHaveCount(0);
	await expect(page.locator('.countdown')).toHaveCount(0);
});

test('all locations can be selected and an empty overlay does not block controls', async ({
	page
}) => {
	await page.getByLabel('Auto Dismissible').uncheck();
	for (const location of [
		'topLeft',
		'top',
		'topRight',
		'left',
		'center',
		'right',
		'bottomLeft',
		'bottom',
		'bottomRight'
	]) {
		await page.getByRole('combobox', { name: 'Location', exact: true }).selectOption(location);
		await page.getByRole('button', { name: 'Show Notification' }).click();
		await expect(page.locator('.notification-container')).toHaveCount(1);
		await page.getByRole('button', { name: 'Close', exact: true }).click();
		await expect(page.locator('.notification-container')).toHaveCount(0);
	}
});

test('custom styles and SVG work without horizontal overflow', async ({ page }) => {
	await page.getByLabel('Auto Dismissible').uncheck();
	await page.getByLabel('Custom Style', { exact: true }).check();
	await page.getByLabel('Primary Color', { exact: true }).fill('#123456');
	await page.getByRole('button', { name: 'Show Notification' }).click();
	await expect(page.locator('.notification-container')).toHaveCSS(
		'background-color',
		'rgb(18, 52, 86)'
	);
	await expect(page.locator('.notification-container svg')).toHaveCount(2);
	expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
		true
	);
});

test('theme toggle matches the applied document theme', async ({ page }) => {
	const button = page.getByRole('button', { name: /Activate .* mode/ });
	const before = await page.locator('html').getAttribute('data-theme');
	await button.click();
	await expect(page.locator('html')).toHaveAttribute(
		'data-theme',
		before === 'dark' ? 'light' : 'dark'
	);
});
