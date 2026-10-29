import { SvelteComponentTyped } from 'svelte';
import type { NotificationProps } from '../types.js';

export default class Notification extends SvelteComponentTyped<
	NotificationProps,
	{ click: MouseEvent },
	{ icon: {}; content: {} }
> {}
