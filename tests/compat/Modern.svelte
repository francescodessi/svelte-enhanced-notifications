<script>
	import { Notification, NotificationService } from '@dflare/svelte-enhanced-notifications';
	import Custom from './ModernCustom.svelte';
	let clicks = $state(0);
	let title = $state('Original title');
	let service = $state();
	let notifications = $state([]);
</script>

<div data-testid="standalone">
	<Notification bind:title onclick={() => clicks++}>
		{#snippet icon()}<span>Modern icon</span>{/snippet}
		{#snippet content()}<span>Modern content: {title}</span>{/snippet}
	</Notification>
</div>
<output data-testid="clicks">{clicks}</output>
<button onclick={() => (title = 'Updated title')}>Update bound title</button>
<NotificationService bind:this={service} bind:notifications />
<button onclick={() => service.push({ component: Custom, title: 'Custom notification' })}
	>Push custom</button
>
<button onclick={() => service.push({ title: 'Timed notification', autoDismissible: true })}
	>Push timed</button
>
<button onclick={() => service.clear()}>Clear all</button>
<output data-testid="count">{notifications.length}</output>
