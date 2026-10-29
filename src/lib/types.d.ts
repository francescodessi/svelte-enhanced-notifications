import type { SvelteComponentTyped } from 'svelte';

/** Snippet props also accept Svelte 5 snippets without requiring Svelte 5 types. */
export type ContentSnippet = (...args: never[]) => any;
export type NotificationComponent =
	| (new (...args: any[]) => SvelteComponentTyped<NotificationProps, any, any>)
	| ((...args: any[]) => any);

export interface Variant {
	primaryColor: string;
	primaryColorVariant: string;
	fontColor: string;
}

export interface NotificationProps {
	title?: string;
	message?: string;
	variant?: string;
	variants?: Record<string, Variant>;
	customIconSvg?: string;
	customPrimaryColor?: string;
	customPrimaryColorVariant?: string;
	customFontColor?: string;
	customWidth?: string;
	showCloseButton?: boolean;
	autoDismissible?: boolean;
	showCountdown?: boolean;
	countdownDuration?: number;
	countdownStart?: boolean;
	onclick?: (event: MouseEvent) => void;
	icon?: ContentSnippet;
	content?: ContentSnippet;
}

export interface NotificationOptions extends NotificationProps {
	id?: number | string;
	component?: NotificationComponent;
}

export interface Location {
	position?: string;
	top?: string;
	left?: string;
	right?: string;
	bottom?: string;
	zIndex?: string;
	transform?: string;
}

export interface NotificationServiceProps {
	location?: string;
	locations?: Record<string, Location>;
	notifications?: NotificationOptions[];
}
