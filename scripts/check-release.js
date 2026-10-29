import { readFileSync } from 'node:fs';

const { version } = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
if (process.env.RELEASE_TAG !== version && process.env.RELEASE_TAG !== `v${version}`) {
	throw new Error(`Release tag must match package.json version (${version})`);
}
