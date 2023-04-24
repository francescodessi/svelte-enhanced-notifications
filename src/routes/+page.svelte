<script>
    import { fade } from 'svelte/transition';
	import NotificationService from '$lib/components/NotificationService.svelte';
    import { DEFAULT_VARIANTS, DEFAULT_LOCATIONS } from "$lib/configurations.js";

    let notficationService;
    let location;
    let title = "NOTIFICATION";
    let message = "This is a notification!";
    let variant;

    let showCloseButton = true;
    let autoDismissible = true;
    let showCountdown = true;
    let countdownDuration = 3000;

    let customStyle = false;
    let customIcon = "line-md:coffee-loop";
    let customPrimaryColor = "#1095c1";
    let customPrimaryColorVariant = "#07495f";
    let customFontColor = "#f0f0f0";    

    function showNotification() {
        notficationService?.push({
            title: title,
            message: message,
            variant: variant,
            showCloseButton: showCloseButton,
            autoDismissible: autoDismissible,
            showCountdown: showCountdown,
            countdownDuration: countdownDuration,
            customIcon: customStyle ? customIcon : undefined,
            customPrimaryColor: customStyle ? customPrimaryColor : undefined,
            customPrimaryColorVariant: customStyle ? customPrimaryColorVariant : undefined,
            customFontColor: customStyle ? customFontColor : undefined,
        });
    }
</script>

<NotificationService bind:this={notficationService} location={location}/>

<div class="container">
    <article>
        <header>
            <strong>Svelte Enhanced Notifications</strong>
        </header>

        <div class="grid">
            <label for="title">
                Title
                <input type="text" id="title" name="title" bind:value={title}/>
            </label>
            <label for="message">
                Message
                <input type="text" id="message" name="message" bind:value={message}/>
            </label>
        </div>

        <div class="grid">
            <label for="variant">
                Variant
                <select name="variant" id="variant" bind:value={variant}>
                    {#each Object.keys(DEFAULT_VARIANTS) as item}
                        <option value={item} selected={item === "success"}>
                            {item}
                        </option>
                    {/each}
                </select>
            </label>

            <label for="location">
                Location
                <select name="location" id="location" bind:value={location}>
                    {#each Object.keys(DEFAULT_LOCATIONS) as item}
                        <option value={item} selected={item === "top"}>
                            {item}
                        </option>
                    {/each}
                </select>
            </label>
        </div>

        <fieldset>
            <label for="showCloseButton">
                <input type="checkbox" id="showCloseButton" name="showCloseButton" role="switch" bind:checked={showCloseButton}/>
                Show Close Button
            </label>
        </fieldset>
        <fieldset>
            <label for="autoDismissible">
                <input type="checkbox" id="autoDismissible" name="autoDismissible" role="switch" bind:checked={autoDismissible}/>
                Auto Dismissible
            </label>
        </fieldset>

        {#if autoDismissible}
            <div transition:fade>
                <fieldset>
                    <label for="showCountdown">
                        <input type="checkbox" id="showCountdown" name="showCountdown" role="switch" bind:checked={showCountdown}/>
                        Show Countdown
                    </label>
                </fieldset>
                <label for="countdownDuration">
                    Countdown Duration (ms)
                    <input type="number" id="countdownDuration" name="countdownDuration" bind:value={countdownDuration}/>
                </label>
            </div>
        {/if}

        <fieldset>
            <label for="customStyle">
                <input type="checkbox" id="customStyle" name="customStyle" role="switch" bind:checked={customStyle}/>
                Custom Style
            </label>
        </fieldset>

        {#if customStyle}
            <div transition:fade>
                <div class="grid">
                    <label for="customPrimaryColor">
                        Primary Color
                        <input type="color" id="customPrimaryColor" name="customPrimaryColor" bind:value={customPrimaryColor} disabled={!customStyle}/>
                    </label>
                    <label for="customPrimaryColorVariant">
                        Primary Color Variant
                        <input type="color" id="customPrimaryColorVariant" name="customPrimaryColorVariant" bind:value={customPrimaryColorVariant} disabled={!customStyle}/>
                    </label>
                    <label for="customFontColor">
                        Font Color
                        <input type="color" id="customFontColor" name="customFontColor" bind:value={customFontColor} disabled={!customStyle}/>
                    </label>
                </div>
                <label for="customIcon">
                    Icon
                    <input type="text" id="customIcon" name="customIcon" bind:value={customIcon} disabled={!customStyle}/>
                    <small>
                        <a href="https://icon-sets.iconify.design/" target="_blank">Pick an icon from iconify.design</a>
                    </small>
                </label>
            </div>
        {/if}
        
        <footer>
            <button on:click={showNotification}>Show Notification</button>
        </footer>
    </article>
</div>

<style>
    @import "https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css";
</style>

