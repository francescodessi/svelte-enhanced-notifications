# Svelte Enhanced Notifications

<!-- SHIELDS -->
[![MIT License][license-shield]][license-url]
[![GitHub release][github-release-shield]][github-release-url]
[![npm version][npm-version-shield]][npm-url]

<!-- Title -->
<br />
<div align="center">
    <h3 align="center">Svelte Enhanced Notifications</h3>
    <p align="center">
        A component that makes it easy to handle notifications in your app.
    <br />
    <a href="https://github.com/francescodessi/svelte-enhanced-notifications"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/github_username/repo_name">View Demo</a>
    ·
    <a href="https://github.com/francescodessi/svelte-enhanced-notifications/issues">Report Bug</a>
    ·
    <a href="https://github.com/francescodessi/svelte-enhanced-notifications/issues">Request Feature</a>
  </p>
</div>
<br />

<!-- TABLE OF CONTENTS -->
<br />
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#notificationservice-component">NotificationService component</a></li>
        <li><a href="#notification-configuration-object">Notification configuration object</a></li>
        <li><a href="#notification-component">Notification component</a></li>
      </ul>
    </li>    
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#how-to-show-a-notification-on-button-click">How to show a notification on button click</a></li>
        <li><a href="#how-to-configure-an-auto-dismissable-notification">How to configure an auto-dismissable notification</a></li>
        <li><a href="#how-to-modify-the-colors-and-icon-of-the-notification">How to modify the colors and icon of the notification</a></li>
        <li><a href="#how-to-modify-the-position-of-the-notifications">How to modify the position of the notifications</a></li>
      </ul>
    </li>
  </ol>
</details>
<br />

<!-- ABOUT THE PROJECT -->
## About The Project
I've been having fun with Svelte and SvelteKit for a while now, and I've decided to put into practice what I've learned by trying to build a simple component for managing notifications. Corrections and suggestions are welcome.

![notifications-screenshot]

<p align="right">(<a href="#svelte-enhanced-notifications">back to top</a>)</p>

### Built With
[![Svelte][svelte-shield]][Svelte-url]
[![SvelteKit][svelteKit-shield]][SvelteKit-url]

<p align="right">(<a href="#svelte-enhanced-notifications">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started
1. Install the package.
   ```sh
   npm i @dflare/svelte-enhanced-notifications
   ```

2. Import the `NotificationService` component.
   ```js
   import {NotificationService} from "@dflare/svelte-enhanced-notifications";
   ```

3. Declare a variable to use as a reference to the component.
   ```js
   let notficationService;
   ```

4. Add the `NotificationService` component to the markup and bind it to the variable declared earlier.
   ```html
   <NotificationService bind:this={notficationService}/>
   ```

5. Use the `push` method to show a notification.
   ```js
   notficationService.push({title: "Notification title", message: "Notification message", variant: "success"});
   ```

<p align="right">(<a href="#svelte-enhanced-notifications">back to top</a>)</p>

### NotificationService component
The `NotificationService` component is the main component that handles notifications and it provides the following properties:

* **`location`**: a string that defines the position on the screen where to display the notifications.The allowed values are: `"topLeft"`, `"top"`, `"topRight"`, `"left"`, `"center"`, `"right"`, `"bottomLeft"`, `"bottom"`, `"bottomRight"`. The default value is `"top"`.
* **`locations`**: it allows you to add additional custom locations or override the configuration of existing ones. This is an object where the properties represent the new locations.
* **`notifications`**: it allows to specify the array of notifications the `NotificationService` component should work with. By default, the component uses its own non-shared array.

You can have multiple `NotificationService` components.
The `NotificationService` `push` method allows displaying a notification based on the notification configuration object given as input.

<p align="right">(<a href="#usage">see the usage examples</a>)</p>
<p align="right">(<a href="#svelte-enhanced-notifications">back to top</a>)</p>

### Notification configuration object
The notification configuration object, the input for `push` method, allows using the following properties to configure a notification:

* **`autoDismissible`**: a boolean that, when `true`, allows automatically closing the notification. The default value is `false`.
* **`component`**: it allows to specify a custom component that represents an individual notification. If present, `NotificationService` will use this instead of the default `Notification` component.
* **`countdownDuration`**: a number that allows setting how many milliseconds the notification should remain visible whene `autoDismissible` is `true`. The default value is `3000`.
* **`customFontColor`**: it allows to modify the font color. The value must be a string representing a valid CSS color (Hexadecimal, RGB, RGBA, HSL, HSLA, Predefined/Cross-browser color names).
* **`customIconSvg`**: it allows to define a custom icon. The value must be a string that represents a valid SVG.
* **`customPrimaryColor`**: it allows to modify the background color of the notification. The value must be a string representing a valid CSS color (Hexadecimal, RGB, RGBA, HSL, HSLA, Predefined/Cross-browser color names).
* **`customPrimaryColorVariant`**: it allows to modify the color of the icons and the countdown timer. The value must be a string representing a valid CSS color (Hexadecimal, RGB, RGBA, HSL, HSLA, Predefined/Cross-browser color names).
* **`message`**: a string that defines the message of the notification.
* **`showCloseButton`**: a boolean that allows showing the close button of the notification when it's `true` and hiding it when it's `false`. The default value is `true`.
* **`showCountdown`**: a boolean that, when `true`, allows showing an indication of how long the notification will remain visible. The default value is `false`.
* **`title`**: a string that defines the title of the notification.
* **`variant`**: a string that allows using one of the predefined variants to define the style of the notification. The allowed values are: `"default"`, `"error"`, `"warning"`, `"success"`, `"info"`, `"help"`.
* **`variants`**: it allows you to add additional custom variants or override the configuration of existing ones. This is an object where the properties represent the new variants.

<p align="right">(<a href="#usage">see the usage examples</a>)</p>
<p align="right">(<a href="#svelte-enhanced-notifications">back to top</a>)</p>

### Notification component
The `Notification` component is the component that implements the individual notification and it can be used to create fully custom notifications.

It provides two named slots:
* **`content`**: useful for customizing the notification content.
* **`icon`**: useful for customizing the notification icon.

It provides the following properties:
* **`autoDismissible`**: a boolean that, when `true`, allows automatically closing the notification. The default value is `false`.
* **`countdownDuration`**: a number that allows setting how many milliseconds the notification should remain visible whene `autoDismissible` is `true`. The default value is `3000`.
* **`countdownStart`**: a boolean that, if set to true, starts the countdown timer. 
* **`customFontColor`**: it allows to modify the font color. The value must be a string representing a valid CSS color (Hexadecimal, RGB, RGBA, HSL, HSLA, Predefined/Cross-browser color names).
* **`customIconSvg`**: it allows to define a custom icon. The value must be a string that represents a valid SVG.
* **`customPrimaryColor`**: it allows to modify the background color of the notification. The value must be a string representing a valid CSS color (Hexadecimal, RGB, RGBA, HSL, HSLA, Predefined/Cross-browser color names).
* **`customPrimaryColorVariant`**: it allows to modify the color of the icons and the countdown timer. The value must be a string representing a valid CSS color (Hexadecimal, RGB, RGBA, HSL, HSLA, Predefined/Cross-browser color names).
* **`message`**: a string that defines the message of the notification.
* **`showCloseButton`**: a boolean that allows showing the close button of the notification when it's `true` and hiding it when it's `false`. The default value is `true`.
* **`showCountdown`**: a boolean that, when `true`, allows showing an indication of how long the notification will remain visible. The default value is `false`.
* **`title`**: a string that defines the title of the notification.
* **`variant`**: a string that allows using one of the predefined variants to define the style of the notification. The allowed values are: `"default"`, `"error"`, `"warning"`, `"success"`, `"info"`, `"help"`.
* **`variants`**: it allows you to add additional custom variants or override the configuration of existing ones. This is an object where the properties represent the new variants.

<p align="right">(<a href="#usage">see the usage examples</a>)</p>
<p align="right">(<a href="#svelte-enhanced-notifications">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

### How to show a notification on button click
```js
<script>
    import {NotificationService} from "@dflare/svelte-enhanced-notifications";

    let notficationService;
    
    let myNotification = {
        title: "Success notification", 
        message: "This is a success notification",
        variant: "success"
    };

    function showNotification() {
        notficationService?.push(myNotification);
    }
</script>

<NotificationService bind:this={notficationService}/>
<button on:click={showNotification}>Show Notification</button>
```
**Result**

![notification-success-screenshot]

<p align="right">(<a href="#svelte-enhanced-notifications">back to top</a>)</p>

### How to configure an auto-dismissable notification
```js
<script>
    import {NotificationService} from "@dflare/svelte-enhanced-notifications";

    let notficationService;
    
    let myNotification = {
        title: "Warning notification", 
        message: "This is a warning notification",
        variant: "warning",
        autoDismissible: true,
        showCloseButton: true,    // It can be omitted if you want to use the default value of true        
        showCountdown: true,      // It can be omitted if you don't want to display the countdown timer.
        countdownDuration: 5000   // It can be omitted if you want to use the default value of 3000 milliseconds.
    };

    function showNotification() {
        notficationService?.push(myNotification);
    }
</script>

<NotificationService bind:this={notficationService}/>
<button on:click={showNotification}>Show Notification</button>
```

**Result**

![notification-warning-screenshot]

The dark line at the bottom of the notification is the countdown timer.

<p align="right">(<a href="#svelte-enhanced-notifications">back to top</a>)</p>


### How to modify the colors and icon of the notification
```js
<script>
    import {NotificationService} from "@dflare/svelte-enhanced-notifications";

    let notficationService;
    
    let myNotification1 = {
        title: "Success notification with cusom icon",
        variant: "success",
        message: "This is a success notification with cusom icon",        
        customIconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 128 128"><path fill="#bdcf46" d="M60.75 33.92c-10.86-1.41-21.57-4.02-31.69 2.28c-9.45 5.9-16.69 15.98-19.45 26.75c-3.9 15.23-1.59 32.57 8.83 44.77c5.72 6.69 15.23 13.81 23.73 16.47c21.82 6.82 48.79 3.58 62.48-16.74c3.91-5.8 7.83-13.66 9.26-20.55c4.01-19.26-.48-41.83-20.42-50.12c-8.88-3.69-18.37-1.66-27.65-2.33c-1.7-.12-3.4-.31-5.09-.53z"/><path fill="#757f3f" d="M93.92.58c7.24-.23 19.38 3 24.29 8.17c.6.64 1.75 1.55 1.92 2.36c.27 1.31-.77 2.43-1.53 3.4c-10.8 13.79-32.92 20.94-46.92 11.57c-1.96-1.31-.91-3.74-.51-5.75c1.6-8.02 7.8-15.38 15.43-18.29A22.33 22.33 0 0 1 93.92.58z"/><path fill="#855c52" d="M71.41 21.92c-.07-.26-.2-.49-.39-.64c-.4-.31-1.23-.62-1.7-.79c-.71-.27-1.47-.38-2.21-.38c-.28 0-.55.01-.81.04c-1 .12-1.86.49-2.43 1.3c-.76 1.05-.63 2.24-.83 3.46c-.28 1.74-1.1 3.32-1.55 5.02c-.35 1.31-.63 2.64-.88 3.98c-.19.98-.35 1.96-.47 2.95c-.43 3.67-1.03 7.34-.87 11.05c.01.51.03 1.02.06 1.53c.01.26.04.51.08.77c.06.34.08.73.12 1.12c.02.14.03.28.05.42c.11.6.32 1.16.89 1.47c.72.4 1.55.58 2.39.59c.26 0 .52-.04.77-.06l.66-.04c.32-.09.65-.21.98-.3c.53-.13 1.05-.4 1.42-.81c.33-.37.37-.75.35-1.19l-.03-.31c-.04-.39-.07-.79-.09-1.19c-.05-.79-.07-1.6-.09-2.39c-.06-1.78-.03-3.58.13-5.36c.11-1.06.16-2.14.25-3.2c.11-1.48.32-2.95.57-4.42c.06-.31.09-.61.15-.91c.36-1.88 1.03-3.57 1.75-5.35c.33-.82.47-1.69.77-2.48c.33-.82 1.06-1.27 1.06-2.25c0-.46.05-1.11-.1-1.63z"/><path fill="#2f2f2f" d="M59.02 50.25c-2.34-.5-4.62-1.33-6.76-2.38c-1.12-.55-4.36-3.13-4.69-.42c-.42 3.27 4.09 6.09 6.33 7.14c3.86 1.82 8.18 2.47 12.33 1.63c3.99-.81 7.41-2.78 9.97-6.24c.32-.45.55-.98.71-1.48c.57-1.81-1.41-1.83-2.47-1.32c-.86.41-1.6 1.07-2.46 1.48c-1.64.79-3.36 1.43-5.11 1.77c-2.61.49-5.26.36-7.85-.18z"/><path fill="#fff" d="M39.17 43.59c-1.28-1.72-4.79-1.88-7.29-1.03c-3.09 1.06-5.84 3.36-7.77 5.97c-1.66 2.24-4.1 6.94-1.69 9.51c1.18 1.25 2.61.76 3.97.08c2.46-1.23 3.96-3.92 6.04-5.65c2.14-1.77 9.72-4.95 6.74-8.88z"/></svg>'    
    };

    let myNotification2 = {
        title: "Custom colors notification", 
        message: "This is a notification with cusom colors",        
        customIconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="48" stroke-dashoffset="48" d="M17 9v9a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="48;0"/></path><path stroke-dasharray="14" stroke-dashoffset="14" d="M17 14H20C20.55 14 21 13.55 21 13V10C21 9.45 20.55 9 20 9H17"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="14;28"/></path></g><mask id="lineMdCoffeeLoop0"><path fill="none" stroke="#fff" stroke-width="2" d="M8 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4M12 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4M16 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4"><animateMotion calcMode="linear" dur="3s" path="M0 0v-8" repeatCount="indefinite"/></path></mask><rect width="24" height="0" y="7" fill="currentColor" mask="url(#lineMdCoffeeLoop0)"><animate fill="freeze" attributeName="y" begin="0.8s" dur="0.6s" values="7;2"/><animate fill="freeze" attributeName="height" begin="0.8s" dur="0.6s" values="0;5"/></rect></svg>',
        customPrimaryColor: "#1095c1",
        customPrimaryColorVariant: "#07495f",
        customFontColor: "#f0f0f0"        
    };

    function showNotification() {
        notficationService?.push(myNotification1);
        notficationService?.push(myNotification2);
    }
</script>

<NotificationService bind:this={notficationService}/>
<button on:click={showNotification}>Show Notification</button>
```
**Result**

![notification-custom-success-screenshot]

![notification-custom-screenshot]

<p align="right">(<a href="#svelte-enhanced-notifications">back to top</a>)</p>


### How to modify the position of the notifications
In this example, three NotificationService components are used with different positions for the notifications.
```js
<script>
    import {NotificationService} from "@dflare/svelte-enhanced-notifications";

    let successNotification = {title: "Success notification", variant: "success", message: "This is an success notification"};
    let warningNotification = {title: "Warning notification", variant: "warning", message: "This is an warning notification"};
    let errorNotification = {title: "Error notification", variant: "error", message: "This is an error notification"};

    function showNotification() {
        successNotficationService?.push(successNotification);
        warningNotficationService?.push(warningNotification);
        errorNotficationService?.push(errorNotification);
    }
</script>

<NotificationService bind:this={successNotficationService} location="top"/>
<NotificationService bind:this={warningNotficationService} location="center"/>
<NotificationService bind:this={errorNotficationService} location="bottom"/>
<button on:click={showNotification}>Show Notification</button>
```

**Result**

![notifications-locations-screenshot]

<p align="right">(<a href="#svelte-enhanced-notifications">back to top</a>)</p>

<!-- LICENSE -->
## License
Distributed under the MIT License. See [LICENSE.md][license-url] for more information.

<p align="right">(<a href="#svelte-enhanced-notifications">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[license-shield]: https://img.shields.io/github/license/francescodessi/svelte-enhanced-notifications?&style=for-the-badge
[license-url]: https://github.com/francescodessi/svelte-enhanced-notifications/blob/main/LICENSE.md
[npm-version-shield]: https://img.shields.io/npm/v/@dflare/svelte-enhanced-notifications?logo=npm&style=for-the-badge
[npm-url]: https://www.npmjs.com/package/@dflare/svelte-enhanced-notifications
[github-release-shield]: https://img.shields.io/github/v/release/francescodessi/svelte-enhanced-notifications?logo=github&style=for-the-badge
[github-release-url]: https://github.com/francescodessi/svelte-enhanced-notifications/releases/latest
[svelte-shield]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte
[Svelte-url]: https://svelte.dev/
[svelteKit-shield]: https://img.shields.io/badge/SvelteKit-4A4A55?style=for-the-badge&logo=svelte
[SvelteKit-url]: https://kit.svelte.dev/
[notifications-screenshot]: https://github.com/francescodessi/svelte-enhanced-notifications/raw/main/static/notifications-screenshot.png
[notification-success-screenshot]: https://github.com/francescodessi/svelte-enhanced-notifications/raw/main/static/notification-success-screenshot.png
[notification-warning-screenshot]: https://github.com/francescodessi/svelte-enhanced-notifications/raw/main/static/notification-warning-screenshot.png
[notification-custom-success-screenshot]: https://github.com/francescodessi/svelte-enhanced-notifications/raw/main/static/notification-custom-success-screenshot.png
[notification-custom-screenshot]: https://github.com/francescodessi/svelte-enhanced-notifications/raw/main/static/notification-custom-screenshot.png
[notifications-locations-screenshot]: https://github.com/francescodessi/svelte-enhanced-notifications/raw/main/static/notifications-locations-screenshot.png

