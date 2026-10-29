<script>
	import { onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import Notification from './Notification.svelte';
	import { DEFAULT_LOCATIONS } from '../configurations.js';
	import { pushNotification } from '../utilities.js';

	/** @type {string | undefined} */
	export let location = 'top';
	/** @type {import('../types.js').NotificationServiceProps['locations']} */
	export let locations = undefined;
	/** @type {import('../types.js').NotificationOptions[]} */
	export let notifications = [];
	/** @type {Record<string, import('../types.js').Location>} */
	let allLocations;
	$: allLocations = { ...DEFAULT_LOCATIONS, ...locations };
	$: placement = Object.prototype.hasOwnProperty.call(allLocations, location ?? 'top')
		? allLocations[location ?? 'top']
		: allLocations.top;
	let countdowns = new Set();
	// Timer handles are bookkeeping, not reactive UI state.
	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	const timers = new Map();
	let nextId = 0;

	/** @param {import('../types.js').NotificationOptions} notification */
	export function push(notification) {
		while (notifications.some((item) => item.id === nextId)) nextId++;
		notifications = pushNotification({ ...notification, id: notification.id ?? nextId++ }, [
			...notifications
		]);
		return notifications[notifications.length - 1].id;
	}

	/** @param {number | string | undefined} id */
	export function dismiss(id) {
		if (!notifications.some((item) => item.id === id)) return;
		clearTimeout(timers.get(id));
		timers.delete(id);
		notifications = notifications.filter((item) => item.id !== id);
	}

	/** @param {import('../types.js').NotificationOptions} notification */
	function componentProps(notification) {
		const props = { ...notification };
		delete props.id;
		delete props.component;
		return props;
	}
	export function clear() {
		for (const timer of timers.values()) clearTimeout(timer);
		timers.clear();
		countdowns = new Set();
		notifications = [];
	}

	/** @param {import('../types.js').NotificationOptions} notification */
	function startCountdown(notification) {
		if (!notification.autoDismissible || timers.has(notification.id)) return;
		const duration = notification.countdownDuration ?? 3000;
		countdowns = new Set([...countdowns, notification.id]);
		timers.set(
			notification.id,
			setTimeout(() => dismiss(notification.id), Math.max(0, duration))
		);
	}

	// Release timers even when the parent removes notifications through a bound array.
	/** @param {import('../types.js').NotificationOptions[]} current */
	function cleanupTimers(current) {
		const ids = new Set(current.map((item) => item.id));
		for (const [id, timer] of timers) {
			if (!ids.has(id)) {
				clearTimeout(timer);
				timers.delete(id);
			}
		}
		countdowns = new Set([...countdowns].filter((id) => ids.has(id)));
	}
	$: cleanupTimers(notifications);

	onDestroy(() => {
		for (const timer of timers.values()) clearTimeout(timer);
	});
</script>

<div
	class="notifications-container"
	aria-live="polite"
	aria-relevant="additions"
	style:position={placement.position}
	style:top={placement.top}
	style:left={placement.left}
	style:right={placement.right}
	style:bottom={placement.bottom}
	style:z-index={placement.zIndex}
	style:transform={placement.transform}
>
	{#each notifications as notification (notification.id)}
		<div
			class="notification-item"
			transition:fade|global={{ duration: 200 }}
			animate:flip={{ duration: 200 }}
			on:introend={() => startCountdown(notification)}
		>
			<svelte:component
				this={notification.component ?? Notification}
				{...componentProps(notification)}
				countdownStart={countdowns.has(notification.id)}
				onclick={() => dismiss(notification.id)}
				on:click={() => dismiss(notification.id)}
			/>
		</div>
	{/each}
</div>

<style>
	.notifications-container {
		width: 100%;
		margin-inline: auto;
		pointer-events: none;
	}
	.notification-item {
		margin: 0.5rem;
	}
	.notification-item > :global(*) {
		pointer-events: auto;
	}
</style>
