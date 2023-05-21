<script>
    import Icon from "./Icon.svelte";
    import { DEFAULT_VARIANTS } from "../configurations.js";

    export let title = undefined;
    export let message = undefined;
    
    export let variant = undefined;
    export let variants = undefined;
    export let customIconSvg = undefined;
    export let customPrimaryColor = undefined;
    export let customPrimaryColorVariant = undefined;
    export let customFontColor = undefined;

    export let showCloseButton = true; 
    export let autoDismissible = false;
    export let showCountdown = false;
    export let countdownDuration = 3000;
    export let countdownStart = false;

    let primaryColor = undefined;
    let primaryColorVariant = undefined;
    let fontColor = undefined;

    $: {
        const ALL_VARIANTS = {...DEFAULT_VARIANTS, ...variants};
        ({primaryColor, primaryColorVariant, fontColor} = ALL_VARIANTS[ALL_VARIANTS.hasOwnProperty(variant) ? variant : "default"]);
       
        if(customPrimaryColor) {
            primaryColor = customPrimaryColor;
        }

        if(customPrimaryColorVariant) {
            primaryColorVariant = customPrimaryColorVariant;
        }

        if(customFontColor) {
            fontColor = customFontColor;
        }
    }
</script>

<div class="notification-container" style="--primary-color:{primaryColor}; --primary-color-variant:{primaryColorVariant}; --font-color:{fontColor};">
    <div class="notification">
        <div>
            <slot name="icon">
                <Icon name={variant} color={primaryColorVariant} customIconSvg={customIconSvg} width="32" height="32"/>
            </slot>
        </div>
        <div class="content">
            <slot>
                {#if title}
                    <div class="title">{title}</div>
                {/if}
                {#if message}
                    <div>{message}</div>
                {/if}
            </slot>
        </div>
        <div class="close">
            {#if showCloseButton ?? true}
                <button title="Close" on:click>
                    <Icon name="close" color={primaryColorVariant} />
                </button>
            {/if}
        </div>
    </div>
    {#if autoDismissible && showCountdown}
        <div class="countdown" style:transition-duration={`${countdownDuration ?? 3000}ms`} style:transform={countdownStart ? "scaleX(0)" : "scaleX(1)"}></div>
    {/if}
</div>

<style>    
    .notification-container {
        --border-radius: 0.25rem;        
        border-radius: var(--border-radius);
        background-color: var(--primary-color);
        box-shadow: 0 2px 4px 0 var(--primary-color-variant);
        color: var(--font-color);
    }

    .notification {
        border-radius: var(--border-radius);
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.25rem 0.25rem 0.25rem 1rem;
    }

    .countdown {
        border-radius: var(--border-radius); 
        border-bottom: solid var(--border-radius) var(--primary-color-variant);      
        transform: scaleX(1);
        transform-origin:  0% 50%;
        transition: transform 0s ease-in-out;
    }

    .content {
        font-size: 1.2rem;
        flex-grow: 1;
    }

    .title {
        font-weight: bold;
    }

    .close {
        align-self: flex-start;
    }

    .close button {
        padding: 0;
        border: 0;
        margin: 0;
        box-shadow: none;
        background: none;
        cursor: pointer;
    }
</style>