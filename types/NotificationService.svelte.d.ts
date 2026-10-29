import { SvelteComponentTyped } from 'svelte';
import type { NotificationServiceProps, NotificationOptions } from '../types.js';

export default class NotificationService extends SvelteComponentTyped<NotificationServiceProps> {
	push(notification: NotificationOptions): number | string;
	dismiss(id: number | string | undefined): void;
	clear(): void;
}
