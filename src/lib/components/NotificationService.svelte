<script>
    import { fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
	import Notification from './Notification.svelte';
    import { DEFAULT_LOCATIONS } from "../configurations.js";
    
    export let location = undefined;
    export let locations = undefined;
    export let notifications = [];

    let position = undefined;
    let top = undefined;
    let left = undefined;
    let right = undefined;
    let bottom = undefined;
    let zIndex = undefined;
    let transform = undefined; 

    $: {
        const ALL_LOCATIONS = {...DEFAULT_LOCATIONS, ...locations};
        ({position, top, left, right, bottom, zIndex, transform} = ALL_LOCATIONS[ALL_LOCATIONS.hasOwnProperty(location) ? location : "top"]);
    }

    export function push(notification) {
        const NOTIFICATION_ID = notifications.length > 0 ? (Number(notifications[notifications.length - 1].id) + 1) : 0;
        notifications[notifications.length] = {id: NOTIFICATION_ID, ...notification};
    }
   
    function dismiss(notificationId) {
        const NOTIFICATION_INDEX = notifications.findIndex(notification => notification.id === notificationId);
        if(NOTIFICATION_INDEX >= 0) {
            clearTimeout(notifications[NOTIFICATION_INDEX].timeoutId);
            notifications = notifications.filter(notification => notification.id !== notificationId);
        }
    }

    async function handleIntroend(notificationId) {
        const NOTIFICATION_INDEX = notifications.findIndex(notification => notification.id === notificationId);
        if(NOTIFICATION_INDEX >= 0 && notifications[NOTIFICATION_INDEX].autoDismissible) {            
            notifications[NOTIFICATION_INDEX].countdownStart = true;
            const COUNTDOWN_DURATION = notifications[NOTIFICATION_INDEX].countdownDuration;
            notifications[NOTIFICATION_INDEX].timeoutId = setTimeout(() => dismiss(notificationId), COUNTDOWN_DURATION);
        }
    }
</script>

<div class="notifications-container" style:position={position} style:top={top} style:left={left} style:right={right} style:bottom={bottom} style:z-index={zIndex} style:transform={transform}>
    {#each notifications as notification (notification.id)}
        <div transition:fade="{{duration: 500}}" animate:flip on:introend={handleIntroend(notification.id)}>
            <svelte:component 
                this={notification.component ?? Notification}
                bind:title={notification.title}
                bind:message={notification.message}
                bind:variant={notification.variant}
                bind:customVariants={notification.customVariants}
                bind:customIconSvg={notification.customIconSvg}
                bind:customPrimaryColor={notification.customPrimaryColor}
                bind:customPrimaryColorVariant={notification.customPrimaryColorVariant}
                bind:customFontColor={notification.customFontColor}
                bind:showCloseButton={notification.showCloseButton}
                bind:autoDismissible={notification.autoDismissible}
                bind:showCountdown={notification.showCountdown}
                bind:countdownDuration={notification.countdownDuration}
                bind:countdownStart={notification.countdownStart}
                on:click={dismiss(notification.id)}
            />
        </div>
    {/each}
</div>

<style>
    .notifications-container {
        width: 100%;
        margin-right: auto;
        margin-left: auto;        
    }

    .notifications-container div {
        margin: 0.5rem;
    }

    @media (min-width: 576px) {
        .notifications-container {
            max-width: 70%;
        }
    }

    @media (min-width: 768px) {
        .notifications-container {
            max-width: 65%;
        }
    }

    @media (min-width: 992px) {
        .notifications-container {
            max-width: 55%;
        }
    }

    @media (min-width: 1200px) {
        .notifications-container {
            max-width: 50%;
        }
    }
</style>