import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import adapter from '@sveltejs/adapter-static';

const basePath = process.env.BASE_PATH ?? '';
if (basePath && (!basePath.startsWith('/') || basePath.endsWith('/')))
	throw new Error('BASE_PATH must start with / and have no trailing slash');

export default defineConfig({
	plugins: [
		sveltekit({
			adapter: adapter(),
			paths: { base: /** @type {'' | `/${string}`} */ (basePath) }
		})
	]
});
