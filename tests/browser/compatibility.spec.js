import { test, expect } from '@playwright/test';

for (const major of [3, 4, 5]) {
	test(`Svelte ${major}: legacy events, slots, bindings, stores and custom components`, async ({
		page
	}) => {
		await page.goto(`http://127.0.0.1:${4171 + major}/tests/compat/legacy/`);
		await expect(page.getByTestId('standalone')).toContainText('Legacy icon');
		await page.getByTestId('standalone').getByRole('button', { name: 'Close' }).click();
		await expect(page.getByTestId('clicks')).toHaveText('1');
		await page.getByRole('button', { name: 'Update bound title' }).click();
		await expect(page.getByTestId('standalone')).toContainText('Updated title');
		for (const name of ['Push shared', 'Push helper', 'Push custom']) {
			await page.getByRole('button', { name, exact: true }).click();
			await expect(page.getByTestId('count')).toHaveText('1');
			await expect(page.locator('.notifications-container .notification-container')).toHaveCount(2);
			await page
				.locator('.notifications-container')
				.first()
				.getByRole('button', { name: 'Close' })
				.click();
			await expect(page.getByTestId('count')).toHaveText('0');
			await expect(page.locator('.notifications-container .notification-container')).toHaveCount(0);
		}
		await page.getByRole('button', { name: 'Push timed' }).click();
		await expect(page.getByTestId('count')).toHaveText('1');
		await expect(page.getByTestId('count')).toHaveText('0', { timeout: 5000 });
	});
}

test('Svelte 5: runes, callbacks, snippets, bindings and modern custom components', async ({
	page
}) => {
	await page.goto('http://127.0.0.1:4176/tests/compat/modern/');
	await expect(page.getByTestId('standalone')).toContainText('Modern icon');
	await expect(page.getByTestId('standalone')).toContainText('Modern content');
	await page.getByTestId('standalone').getByRole('button', { name: 'Close' }).click();
	await expect(page.getByTestId('clicks')).toHaveText('1');
	await page.getByRole('button', { name: 'Update bound title' }).click();
	await expect(page.getByTestId('standalone')).toContainText('Updated title');
	await page.getByRole('button', { name: 'Push custom' }).click();
	await expect(page.locator('.notifications-container')).toContainText('Custom content');
	await page.locator('.notifications-container').getByRole('button', { name: 'Close' }).click();
	await expect(page.getByTestId('count')).toHaveText('0');
	await page.getByRole('button', { name: 'Push timed' }).click();
	await expect(page.getByTestId('count')).toHaveText('1');
	await page.getByRole('button', { name: 'Clear all' }).click();
	await expect(page.getByTestId('count')).toHaveText('0');
});
