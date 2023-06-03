<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
	import NotificationService from '$lib/components/NotificationService.svelte';
    import { DEFAULT_VARIANTS, DEFAULT_LOCATIONS } from "$lib/configurations.js";

    let theme;

    $: icon = theme === "light" ? "material-symbols:dark-mode-outline" : theme === "dark" ? "material-symbols:light-mode-outline" : undefined;
    $: label = `Activate ${theme === "light" ? "dark" : "light"} mode`;

    onMount(() => {
        theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    function themSwitch() {
        theme = document.querySelector("html").getAttribute("data-theme") === "dark" ? "light" : "dark";
        document.querySelector("html").setAttribute("data-theme", theme); 
    }  
    
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
    let customIconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="48" stroke-dashoffset="48" d="M17 9v9a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="48;0"/></path><path stroke-dasharray="14" stroke-dashoffset="14" d="M17 14H20C20.55 14 21 13.55 21 13V10C21 9.45 20.55 9 20 9H17"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="14;28"/></path></g><mask id="lineMdCoffeeLoop0"><path fill="none" stroke="#fff" stroke-width="2" d="M8 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4M12 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4M16 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4"><animateMotion calcMode="linear" dur="3s" path="M0 0v-8" repeatCount="indefinite"/></path></mask><rect width="24" height="0" y="7" fill="currentColor" mask="url(#lineMdCoffeeLoop0)"><animate fill="freeze" attributeName="y" begin="0.8s" dur="0.6s" values="7;2"/><animate fill="freeze" attributeName="height" begin="0.8s" dur="0.6s" values="0;5"/></rect></svg>';
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
            customIconSvg: customStyle ? customIconSvg : undefined,
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
            <a href="https://github.com/francescodessi/svelte-enhanced-notifications" target="_blank" title="GitHub" role="button" class="secondary outline github-link"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/></svg></a>
            {#if icon}
            <button type="button" on:click={themSwitch} class="secondary outline theme-switch-button" title={label}>
                {#if theme === "light"}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21q-3.75 0-6.375-2.625T3 12q0-3.75 2.625-6.375T12 3q.35 0 .688.025t.662.075q-1.025.725-1.638 1.888T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q1.375 0 2.525-.613T20.9 10.65q.05.325.075.662T21 12q0 3.75-2.625 6.375T12 21Zm0-2q2.2 0 3.95-1.213t2.55-3.162q-.5.125-1 .2t-1 .075q-3.075 0-5.238-2.163T9.1 7.5q0-.5.075-1t.2-1q-1.95.8-3.163 2.55T5 12q0 2.9 2.05 4.95T12 19Zm-.25-6.75Z"/></svg>
                {:else if theme === "dark"}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 15q1.25 0 2.125-.875T15 12q0-1.25-.875-2.125T12 9q-1.25 0-2.125.875T9 12q0 1.25.875 2.125T12 15Zm0 2q-2.075 0-3.538-1.463T7 12q0-2.075 1.463-3.538T12 7q2.075 0 3.538 1.463T17 12q0 2.075-1.463 3.538T12 17ZM2 13q-.425 0-.713-.288T1 12q0-.425.288-.713T2 11h2q.425 0 .713.288T5 12q0 .425-.288.713T4 13H2Zm18 0q-.425 0-.713-.288T19 12q0-.425.288-.713T20 11h2q.425 0 .713.288T23 12q0 .425-.288.713T22 13h-2Zm-8-8q-.425 0-.713-.288T11 4V2q0-.425.288-.713T12 1q.425 0 .713.288T13 2v2q0 .425-.288.713T12 5Zm0 18q-.425 0-.713-.288T11 22v-2q0-.425.288-.713T12 19q.425 0 .713.288T13 20v2q0 .425-.288.713T12 23ZM5.65 7.05L4.575 6q-.3-.275-.288-.7t.288-.725q.3-.3.725-.3t.7.3L7.05 5.65q.275.3.275.7t-.275.7q-.275.3-.687.288T5.65 7.05ZM18 19.425l-1.05-1.075q-.275-.3-.275-.713t.275-.687q.275-.3.688-.287t.712.287L19.425 18q.3.275.288.7t-.288.725q-.3.3-.725.3t-.7-.3ZM16.95 7.05q-.3-.275-.288-.687t.288-.713L18 4.575q.275-.3.7-.288t.725.288q.3.3.3.725t-.3.7L18.35 7.05q-.3.275-.7.275t-.7-.275ZM4.575 19.425q-.3-.3-.3-.725t.3-.7l1.075-1.05q.3-.275.712-.275t.688.275q.3.275.288.688t-.288.712L6 19.425q-.275.3-.7.288t-.725-.288ZM12 12Z"/></svg>
                {/if}
            </button>
            {/if}            
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
                <label for="customIconSvg">
                    Icon svg
                    <input type="text" id="customIconSvg" name="customIconSvg" bind:value={customIconSvg} disabled={!customStyle}/>
                    <small>
                        <a href="https://icon-sets.iconify.design/" target="_blank">Pick an icon from iconify.design</a>
                    </small>
                </label>
            </div>
        {/if}
        
        <footer>
            <button type="button" on:click={showNotification}>Show Notification</button>
        </footer>
    </article>
</div>

<style>
    @import "https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css";

    header {
        display: flex;
        flex-wrap: wrap;
    }

    header > :nth-child(2) {
        margin: 0 0 0 auto;
    }

    .theme-switch-button, .github-link {
        width: fit-content;        
        padding: 0;
        border: 0;
        box-shadow: none;
    }
</style>

