<script>
	import { Notification } from '@dflare/svelte-enhanced-notifications';
	let { title, onclick } = $props();
</script>

<Notification {onclick}>
	{#snippet content()}<span>Custom content: {title}</span>{/snippet}
</Notification>
