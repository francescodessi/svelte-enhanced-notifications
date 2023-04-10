<script>
	import NotificationService from '$lib/NotificationService.svelte';
    import { DEFAULT_VARIANTS, DEFAULT_LOCATIONS } from "$lib/configurations.js";

    let notficationService;
    let selectedVariant;
    let selectedLocation;

    function showNotification() {
        notficationService?.push({
            title: selectedVariant.toUpperCase(),
            message: "This si a notification!",
            variant: selectedVariant,            
            autoDismissible: true,
            showCountdown: true
        });
    }
</script>

<NotificationService bind:this={notficationService} location={selectedLocation}/>

<div class="container">
    <article>
        <header>
            <h3>Enhanced Notifications</h3>
        </header>
        <form>
            <div class="grid">
                <label for="variant">
                    Variant
                    <select name="variant" bind:value={selectedVariant}>
                        {#each Object.keys(DEFAULT_VARIANTS) as variant}
                            <option value={variant}>
                                {variant}
                            </option>
                        {/each}
                    </select>
                </label>

                <label for="location">
                    Location
                    <select name="location" bind:value={selectedLocation}>
                        {#each Object.keys(DEFAULT_LOCATIONS) as location}
                            <option value={location}>
                                {location}
                            </option>
                        {/each}
                    </select>
                </label>
            </div>
            <button on:click={showNotification}>Show Notification</button>        
        </form>
    </article>
</div>

<style>
    @import "https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css";
</style>

