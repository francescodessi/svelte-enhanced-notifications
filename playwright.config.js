import { defineConfig, devices } from '@playwright/test';

const basePath = process.env.BASE_PATH ?? '';

export default defineConfig({
	testDir: './tests/browser',
	fullyParallel: true,
	use: {
		baseURL: `http://127.0.0.1:4173${basePath}/`,
		trace: 'retain-on-failure',
		channel: process.env.PLAYWRIGHT_CHANNEL,
		launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
	},
	projects: [
		{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
		{ name: 'mobile', use: { ...devices['Pixel 7'] } }
	],
	webServer: [
		{
			command:
				'node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 4173 --strictPort',
			url: `http://127.0.0.1:4173${basePath}/`,
			reuseExistingServer: false
		},
		...[3, 4, 5].map((major) => ({
			command:
				'node node_modules/vite/bin/vite.js preview --config tests/compat/vite.config.js --host 127.0.0.1 --port ' +
				(4171 + major) +
				' --strictPort --outDir .compat/svelte' +
				major,
			url: 'http://127.0.0.1:' + (4171 + major) + '/tests/compat/legacy/',
			reuseExistingServer: false
		}))
	]
});
