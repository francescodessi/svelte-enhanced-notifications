<script>
	import {
		Notification,
		NotificationService,
		pushNotification
	} from '@dflare/svelte-enhanced-notifications';
	import Custom from './LegacyCustom.svelte';
	import { writable } from 'svelte/store';
	let clicks = 0;
	let title = 'Original title';
	let service;
	const notifications = writable([]);
</script>

<div data-testid="standalone">
	<Notification bind:title on:click={() => clicks++}>
		<span slot="icon">Legacy icon</span>
		<span slot="content">Legacy content: {title}</span>
	</Notification>
</div>
<output data-testid="clicks">{clicks}</output>
<button on:click={() => (title = 'Updated title')}>Update bound title</button>
<NotificationService bind:this={service} bind:notifications={$notifications} />
<NotificationService bind:notifications={$notifications} location="bottom" />
<button on:click={() => service.push({ title: 'Shared notification' })}>Push shared</button>
<button
	on:click={() =>
		($notifications = pushNotification({ title: 'Helper notification' }, $notifications))}
	>Push helper</button
>
<button on:click={() => service.push({ component: Custom, title: 'Custom notification' })}
	>Push custom</button
>
<button on:click={() => service.push({ title: 'Timed notification', autoDismissible: true })}
	>Push timed</button
>
<button on:click={() => service.clear()}>Clear all</button>
<output data-testid="count">{$notifications.length}</output>
