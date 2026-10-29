import { copyFile } from 'node:fs/promises';
// Preserve declarations usable by Svelte 3/4 as well as Svelte 5 consumers.
for (const name of ['Notification', 'NotificationService']) {
	await copyFile(
		new URL('../types/' + name + '.svelte.d.ts', import.meta.url),
		new URL('../dist/components/' + name + '.svelte.d.ts', import.meta.url)
	);
}
