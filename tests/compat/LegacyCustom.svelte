<script>
	import { Notification } from '@dflare/svelte-enhanced-notifications';
	export let title;
</script>

<Notification {title} on:click>
	<span slot="content">Custom content: {title}</span>
</Notification>
