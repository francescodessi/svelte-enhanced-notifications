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
    <a href="https://francescodessi.github.io/svelte-enhanced-notifications/" target="_blank">View Demo</a>
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
    <li><a href="#compatibility-and-whats-new-in-110">Compatibility and what’s new in 1.1.0</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#notificationservice-component">NotificationService component</a></li>
        <li><a href="#notification-configuration-object">Notification configuration object</a></li>
        <li><a href="#notification-component">Notification component</a></li>
        <li><a href="#utility-function-pushnotification">Utility function pushNotification</a></li>
      </ul>
    </li>    
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#how-to-show-a-notification-on-button-click">How to show a notification on button click</a></li>
        <li><a href="#how-to-configure-an-auto-dismissible-notification">How to configure an auto-dismissible notification</a></li>
        <li><a href="#how-to-modify-the-colors-and-icon-of-the-notification">How to modify the colors and icon of the notification</a></li>
        <li><a href="#how-to-modify-the-position-of-the-notifications">How to modify the position of the notifications</a></li>
        <li><a href="#how-to-use-an-arbitrary-array-as-a-notification-container-and-share-it-among-multiple-notificationservice-component">How to share a notification array between multiple NotificationService components</a></li>
        <li><a href="#how-to-create-custom-notifications">How to create custom notifications</a></li>
      </ul>
    </li>
  </ol>
</details>
<br />

<!-- ABOUT THE PROJECT -->

## About The Project

After experimenting with Svelte and SvelteKit, I created this library to put what I had learned into practice and make notifications easier to manage. Corrections and suggestions are welcome.

![notifications-screenshot]

### Built With

[![Svelte][svelte-shield]][Svelte-url]

[![SvelteKit][svelteKit-shield]][SvelteKit-url]

The <a href="https://francescodessi.github.io/svelte-enhanced-notifications/" target="_blank">demo app</a> uses <a href="https://picocss.com/" target="_blank">Pico.css</a> as its styling framework.

The SVG icons used in this project come from <a href="https://iconify.design/" target="_blank">Iconify</a>, specifically the following icons:

- <a href="https://icon-sets.iconify.design/line-md/coffee-loop/" target="_blank">line-md:coffee-loop</a>
- <a href="https://icon-sets.iconify.design/material-symbols/check-circle-rounded/" target="_blank">material-symbols:check-circle-rounded</a>
- <a href="https://icon-sets.iconify.design/material-symbols/close/" target="_blank">material-symbols:close</a>
- <a href="https://icon-sets.iconify.design/material-symbols/dark-mode-outline/" target="_blank">material-symbols:dark-mode-outline</a>
- <a href="https://icon-sets.iconify.design/material-symbols/error-rounded/" target="_blank">material-symbols:error-rounded</a>
- <a href="https://icon-sets.iconify.design/material-symbols/help-rounded/" target="_blank">material-symbols:help-rounded</a>
- <a href="https://icon-sets.iconify.design/material-symbols/info-rounded/" target="_blank">material-symbols:info-rounded</a>
- <a href="https://icon-sets.iconify.design/material-symbols/light-mode-outline/" target="_blank">material-symbols:light-mode-outline</a>
- <a href="https://icon-sets.iconify.design/material-symbols/warning-rounded/" target="_blank">material-symbols:warning-rounded</a>
- <a href="https://icon-sets.iconify.design/mdi/github/" target="_blank">mdi:github</a>
- <a href="https://icon-sets.iconify.design/noto-v1/green-apple/" target="_blank">noto-v1:green-apple</a>

<a id="compatibility-and-whats-new-in-110"></a>

## Compatibility and what's new in 1.1.0

Version 1.1.0 adds Svelte 5 support while preserving the original component API.
Existing examples, named slots, event forwarding, bound properties, shared arrays, and
writable stores remain supported. You do not need to rewrite an existing application
using the new syntax.

| Application                      | Supported usage                                              |
| -------------------------------- | ------------------------------------------------------------ |
| Svelte 3.54+ or Svelte 4         | Existing `on:click`, named slots, `bind:`, arrays and stores |
| Svelte 5, legacy-mode components | The same original syntax                                     |
| Svelte 5, runes-mode components  | `$state`, `onclick` callbacks and named snippets             |

The library keeps its internal components in legacy mode so that all three Svelte
majors can compile the same package. Svelte 5 can pass snippets to these slot-based
components. A parent using runes can still bind their exported properties.
Choose one content style per component instance: named slots or snippets.

### What has changed

- `push(options)` and `pushNotification(options, array)` remain available.
- `push` now returns the notification ID. Use `service.dismiss(id)` to remove one
  notification or `service.clear()` to remove all notifications managed by that service.
  With a shared array, the other bound services update as well.
- `Notification` accepts an optional `onclick` callback in addition to forwarding the
  original `click` event. Custom components may use either mechanism to request dismissal.
- Named `icon` and `content` slots remain supported. In Svelte 5, snippets with those
  names can supply the same content. Existing custom notification wrappers still work.
- Automatic dismissal consistently defaults to 3000 ms and starts after the entrance
  transition. Timers are cleaned up when notifications are removed or a service is destroyed.
  Timer handles are internal; applications should use the service methods to dismiss notifications.
- Generated IDs avoid existing numeric IDs. Explicit IDs must be unique within their
  notification array; duplicate IDs now produce a descriptive error instead of a broken keyed list.
- Narrow-screen text wrapping and the notification overlay's pointer handling have improved.
- The development demo uses Svelte 5, SvelteKit 3, Vite 8, and locally bundled Pico.css.
  These build tools are development dependencies, not requirements for applications using
  the published library with Svelte 3 or 4.

A standalone `Notification` renders its content, close control, and optional countdown
bar. `NotificationService` manages automatic removal; a standalone component does not
remove itself when its countdown ends.

### Svelte 5 example

The original examples in the rest of this README remain valid. This is the equivalent
service setup in a component using runes:

```svelte
<script>
  import { NotificationService } from '@dflare/svelte-enhanced-notifications';
  let notificationService = $state();

  function showNotification() {
    notificationService?.push({
      title: 'Saved',
      message: 'Your changes have been saved.',
      variant: 'success',
      autoDismissible: true,
      showCountdown: true
    });
  }
</script>

<NotificationService bind:this={notificationService} />
<button onclick={showNotification}>Show notification</button>
```

For a shared array in runes mode, declare `let notifications = $state([])` and keep
using `bind:notifications`. Writable stores and the existing reassignment pattern
`notifications = pushNotification(options, notifications)` continue to work.

### Slots and snippets side by side

Existing slot-based content:

```svelte
<Notification on:click={handleClose}>
  <span slot="icon">✓</span>
  <strong slot="content">Saved successfully</strong>
</Notification>
```

Equivalent content in Svelte 5:

```svelte
<Notification onclick={handleClose}>
  {#snippet icon()}<span>✓</span>{/snippet}
  {#snippet content()}<strong>Saved successfully</strong>{/snippet}
</Notification>
```

When wrapping `Notification` in a modern custom component, accept `onclick` from the
service and pass it to the inner notification:

```svelte
<script>
  import { Notification } from '@dflare/svelte-enhanced-notifications';
  let { title, onclick } = $props();
</script>

<Notification {onclick}>
  {#snippet content()}<strong>{title}</strong>{/snippet}
</Notification>
```

Existing custom components that forward `on:click` do not need this change.

### Development and verification

To work on this repository, use Node 22.17 or newer; CI uses Node 24.
The published package does not impose the repository's Node requirement. Use the Node
version required by your application's Svelte version and build tools.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5173 to try the demo.

```sh
npm run check
npm run lint
npm test
npm run build
npx playwright install chromium
npm run test:e2e
npm pack --dry-run
```

The browser suite checks the production demo on desktop and mobile, then compiles and
runs the distributed library with Svelte 3, 4, and 5. It verifies legacy events, slots,
bindings, shared stores, custom components, timers, and modern Svelte 5 callbacks/snippets.
To use an installed browser locally, set `PLAYWRIGHT_CHANNEL=chrome` or supply its full
path through `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`.

### Dependency audit

The test matrix includes old Svelte compilers under the development-only aliases `svelte3`
and `svelte4`. Their historical advisories may appear in `npm audit`; these aliases are
not shipped with the library or used to build the public demo. Compatibility support
does not remove upstream vulnerabilities in older Svelte runtimes. The current tooling
also reports the low-severity transitive `deepmerge` advisory GHSA-gcqx-w48m-w2h4.

### Publishing

The Pages workflow now uses Node 24, current GitHub Actions, reproducible installs,
and automated checks. Pull requests run validation; pushes to main and manual runs
also deploy. In repository settings, select **Pages → Source → GitHub Actions**.
The Pages configuration supplies the deployment base path.

The npm workflow validates stable GitHub releases, checks that the release tag matches
`package.json`, and runs the checks and browser tests before publishing with provenance.
For this version, use the tag `v1.1.0` or `1.1.0` after committing both package files.
Prereleases are not published by this workflow.

For npm authentication, either configure a Trusted Publisher for owner
`francescodessi`, repository `svelte-enhanced-notifications`, and workflow filename
`npm-publish.yml` (no environment name), or retain a valid granular token in the
existing repository secret `npm_token`. These account settings must be verified separately.

The older Svelte REPL links below are retained as historical examples. Their hosted
package versions may differ from the current release.

<!-- GETTING STARTED -->

## Getting Started

The examples below retain the original syntax. They work with Svelte 3.54+, Svelte 4, and Svelte 5 in legacy mode. For runes, callback props, and snippet examples, see [Compatibility and what’s new in 1.1.0](#compatibility-and-whats-new-in-110).

1. Install the package.

   ```sh
   npm i @dflare/svelte-enhanced-notifications
   ```

2. Import the `NotificationService` component.

   ```js
   import { NotificationService } from '@dflare/svelte-enhanced-notifications';
   ```

3. Declare a variable to use as a reference to the component.

   ```js
   let notificationService;
   ```

4. Add the `NotificationService` component to the markup and bind it to the variable declared earlier.

   ```svelte
   <NotificationService bind:this={notificationService} />
   ```

5. Use the `push` method to show a notification.
   ```js
   notificationService.push({
     title: 'Notification title',
     message: 'Notification message',
     variant: 'success'
   });
   ```

### NotificationService component

The `NotificationService` component manages the notification list and provides the following properties:

- **`location`**: the screen position: `"topLeft"`, `"top"`, `"topRight"`, `"left"`, `"center"`, `"right"`, `"bottomLeft"`, `"bottom"`, or `"bottomRight"`. The default is `"top"`.
- **`locations`**: an object containing named custom locations or overrides for the built-in locations. See the `DEFAULT_LOCATIONS` constant in the <a href="https://github.com/francescodessi/svelte-enhanced-notifications/blob/main/src/lib/configurations.js" target="_blank">configurations.js</a> file and the <a href="#how-to-modify-the-position-of-the-notifications">examples</a>.
- **`notifications`**: the notification array to manage. By default, each service uses its own array. Bind this property to share an array between services. See <a href="#how-to-use-an-arbitrary-array-as-a-notification-container-and-share-it-among-multiple-notificationservice-component">examples</a>.

You can have multiple `NotificationService` components.
Call its `push` method with a notification configuration object to display a notification.

<p align="right">(<a href="#usage">see the usage examples</a>)</p>

### Notification configuration object

Pass a configuration object to `push` to customize a notification. The following properties are available:

- **`autoDismissible`**: a boolean that enables automatic dismissal when `true`. The default is `false`.
- **`component`**: a custom notification component. When provided, `NotificationService` renders it instead of the default `Notification` component.
- **`countdownDuration`**: the number of milliseconds before an automatically dismissible notification closes. The default is `3000`.
- **`customFontColor`**: the text color, specified as any valid CSS color string (for example, hex, RGB, HSL, or a named color).
- **`customIconSvg`**: a custom icon supplied as an SVG string. Use only trusted markup; untrusted input must be sanitized before it is passed to this property.
- **`customPrimaryColor`**: the notification background color, specified as any valid CSS color string.
- **`customPrimaryColorVariant`**: the icon and countdown bar color, specified as any valid CSS color string.
- **`customWidth`**: a CSS width string, such as `400px` or `90%`. If omitted, the notification uses the following responsive widths:
  - when the viewport width is less than 576 pixels, the notification occupies 100% of the available width.
  - when the viewport width is at least 576 pixels, the notification occupies 70% of the available width.
  - when the viewport width is at least 768 pixels, the notification occupies 65% of the available width.
  - when the viewport width is at least 992 pixels, the notification occupies 55% of the available width.
  - when the viewport width is at least 1200 pixels, the notification occupies 50% of the available width.
- **`message`**: the notification message, supplied as plain text.
- **`showCloseButton`**: a boolean that controls whether the close button is visible. The default is `true`.
- **`showCountdown`**: a boolean that shows a countdown bar when automatic dismissal is enabled. The default is `false`.
- **`title`**: the notification title, supplied as plain text.
- **`variant`**: the style variant to use: `"default"`, `"error"`, `"warning"`, `"success"`, `"info"`, or `"help"`.
- **`variants`**: an object containing named custom variants or overrides for the built-in variants. See the `DEFAULT_VARIANTS` constant in the <a href="https://github.com/francescodessi/svelte-enhanced-notifications/blob/main/src/lib/configurations.js#L1" target="_blank">configurations.js</a> file and the <a href="#how-to-modify-the-colors-and-icon-of-the-notification">examples</a>.

<p align="right">(<a href="#usage">see the usage examples</a>)</p>

### Notification component

The `Notification` component renders an individual notification. Use it directly or as the foundation for a custom notification component.

It provides two named slots:

- **`content`**: useful for customizing the notification content.
- **`icon`**: useful for customizing the notification icon.

It provides the following properties:

- **`autoDismissible`**: a boolean that enables automatic dismissal when `true`. The default is `false`.
- **`countdownDuration`**: the number of milliseconds before an automatically dismissible notification closes. The default is `3000`.
- **`countdownStart`**: a boolean that starts the visual countdown when `true`. `NotificationService` sets this automatically.
- **`customFontColor`**: the text color, specified as any valid CSS color string (for example, hex, RGB, HSL, or a named color).
- **`customIconSvg`**: a custom icon supplied as an SVG string. Use only trusted markup; untrusted input must be sanitized before it is passed to this property.
- **`customPrimaryColor`**: the notification background color, specified as any valid CSS color string.
- **`customWidth`**: a CSS width string, such as `400px` or `90%`. If omitted, the notification uses the following responsive widths:
  - when the viewport width is less than 576 pixels, the notification occupies 100% of the available width.
  - when the viewport width is at least 576 pixels, the notification occupies 70% of the available width.
  - when the viewport width is at least 768 pixels, the notification occupies 65% of the available width.
  - when the viewport width is at least 992 pixels, the notification occupies 55% of the available width.
  - when the viewport width is at least 1200 pixels, the notification occupies 50% of the available width.
- **`customPrimaryColorVariant`**: the icon and countdown bar color, specified as any valid CSS color string.
- **`message`**: the notification message, supplied as plain text.
- **`showCloseButton`**: a boolean that controls whether the close button is visible. The default is `true`.
- **`showCountdown`**: a boolean that shows a countdown bar when automatic dismissal is enabled. The default is `false`.
- **`title`**: the notification title, supplied as plain text.
- **`variant`**: the style variant to use: `"default"`, `"error"`, `"warning"`, `"success"`, `"info"`, or `"help"`.
- **`variants`**: an object containing named custom variants or overrides for the built-in variants. See the `DEFAULT_VARIANTS` constant in the <a href="https://github.com/francescodessi/svelte-enhanced-notifications/blob/main/src/lib/configurations.js#L1" target="_blank">configurations.js</a> file and the <a href="#how-to-create-custom-notifications">examples</a>.

<p align="right">(<a href="#how-to-create-custom-notifications">see the usage examples</a>)</p>

### Utility function pushNotification

Use `pushNotification` to add a notification without a component reference. It accepts the notification configuration and the target array, appends the notification, and returns the same array. Reassign the result to trigger updates in legacy components, as shown below. A `NotificationService` bound to that array renders the notification.

<p align="right">(<a href="#how-to-use-an-arbitrary-array-as-a-notification-container-and-share-it-among-multiple-notificationservice-component">see the usage examples</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

### How to show a notification on button click

```svelte
<script>
  import { NotificationService } from '@dflare/svelte-enhanced-notifications';

  let notificationService;

  let myNotification = {
    title: 'Success notification',
    message: 'This is a success notification',
    variant: 'success'
  };

  function showNotification() {
    notificationService?.push(myNotification);
  }
</script>

<NotificationService bind:this={notificationService} />
<button on:click={showNotification}>Show Notification</button>
```

**Result**

![notification-success-screenshot]

<p align="right">(<a href="https://svelte.dev/repl/23e6abbae530474a9e09e23392005dbb" target="_blank">Try it on Svelte REPL</a>)</p>

<a id="how-to-configure-an-auto-dismissable-notification"></a>

### How to configure an auto-dismissible notification

```svelte
<script>
  import { NotificationService } from '@dflare/svelte-enhanced-notifications';

  let notificationService;

  let myNotification = {
    title: 'Warning notification',
    message: 'This is a warning notification',
    variant: 'warning',
    autoDismissible: true,
    showCloseButton: true, // It can be omitted if you want to use the default value of true
    showCountdown: true, // It can be omitted if you don't want to display the countdown timer.
    countdownDuration: 5000 // It can be omitted if you want to use the default value of 3000 milliseconds.
  };

  function showNotification() {
    notificationService?.push(myNotification);
  }
</script>

<NotificationService bind:this={notificationService} />
<button on:click={showNotification}>Show Notification</button>
```

**Result**

![notification-warning-screenshot]

The dark line at the bottom of the notification is the countdown timer.

<p align="right">(<a href="https://svelte.dev/repl/86604216e9ea40c4baf31d13659ecced" target="_blank">Try it on Svelte REPL</a>)</p>

### How to modify the colors and icon of the notification

Customize the appearance of notifications with `customIconSvg`, `customPrimaryColor`, `customPrimaryColorVariant`, `customFontColor`, and `customWidth`, or define your own variants.

```svelte
<script>
  import { NotificationService } from '@dflare/svelte-enhanced-notifications';

  let notificationService;

  // A success notification with a custom icon
  let successNotificationCustomIcon = {
    title: 'Success notification with custom icon',
    variant: 'success',
    message: 'This is a success notification with custom icon',
    customIconSvg:
      '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 128 128"><path fill="#bdcf46" d="M60.75 33.92c-10.86-1.41-21.57-4.02-31.69 2.28c-9.45 5.9-16.69 15.98-19.45 26.75c-3.9 15.23-1.59 32.57 8.83 44.77c5.72 6.69 15.23 13.81 23.73 16.47c21.82 6.82 48.79 3.58 62.48-16.74c3.91-5.8 7.83-13.66 9.26-20.55c4.01-19.26-.48-41.83-20.42-50.12c-8.88-3.69-18.37-1.66-27.65-2.33c-1.7-.12-3.4-.31-5.09-.53z"/><path fill="#757f3f" d="M93.92.58c7.24-.23 19.38 3 24.29 8.17c.6.64 1.75 1.55 1.92 2.36c.27 1.31-.77 2.43-1.53 3.4c-10.8 13.79-32.92 20.94-46.92 11.57c-1.96-1.31-.91-3.74-.51-5.75c1.6-8.02 7.8-15.38 15.43-18.29A22.33 22.33 0 0 1 93.92.58z"/><path fill="#855c52" d="M71.41 21.92c-.07-.26-.2-.49-.39-.64c-.4-.31-1.23-.62-1.7-.79c-.71-.27-1.47-.38-2.21-.38c-.28 0-.55.01-.81.04c-1 .12-1.86.49-2.43 1.3c-.76 1.05-.63 2.24-.83 3.46c-.28 1.74-1.1 3.32-1.55 5.02c-.35 1.31-.63 2.64-.88 3.98c-.19.98-.35 1.96-.47 2.95c-.43 3.67-1.03 7.34-.87 11.05c.01.51.03 1.02.06 1.53c.01.26.04.51.08.77c.06.34.08.73.12 1.12c.02.14.03.28.05.42c.11.6.32 1.16.89 1.47c.72.4 1.55.58 2.39.59c.26 0 .52-.04.77-.06l.66-.04c.32-.09.65-.21.98-.3c.53-.13 1.05-.4 1.42-.81c.33-.37.37-.75.35-1.19l-.03-.31c-.04-.39-.07-.79-.09-1.19c-.05-.79-.07-1.6-.09-2.39c-.06-1.78-.03-3.58.13-5.36c.11-1.06.16-2.14.25-3.2c.11-1.48.32-2.95.57-4.42c.06-.31.09-.61.15-.91c.36-1.88 1.03-3.57 1.75-5.35c.33-.82.47-1.69.77-2.48c.33-.82 1.06-1.27 1.06-2.25c0-.46.05-1.11-.1-1.63z"/><path fill="#2f2f2f" d="M59.02 50.25c-2.34-.5-4.62-1.33-6.76-2.38c-1.12-.55-4.36-3.13-4.69-.42c-.42 3.27 4.09 6.09 6.33 7.14c3.86 1.82 8.18 2.47 12.33 1.63c3.99-.81 7.41-2.78 9.97-6.24c.32-.45.55-.98.71-1.48c.57-1.81-1.41-1.83-2.47-1.32c-.86.41-1.6 1.07-2.46 1.48c-1.64.79-3.36 1.43-5.11 1.77c-2.61.49-5.26.36-7.85-.18z"/><path fill="#fff" d="M39.17 43.59c-1.28-1.72-4.79-1.88-7.29-1.03c-3.09 1.06-5.84 3.36-7.77 5.97c-1.66 2.24-4.1 6.94-1.69 9.51c1.18 1.25 2.61.76 3.97.08c2.46-1.23 3.96-3.92 6.04-5.65c2.14-1.77 9.72-4.95 6.74-8.88z"/></svg>'
  };

  // A default notification with custom colors
  let customColorNotification = {
    title: 'Custom colors notification',
    message: 'This is a notification with custom colors',
    customIconSvg:
      '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="48" stroke-dashoffset="48" d="M17 9v9a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="48;0"/></path><path stroke-dasharray="14" stroke-dashoffset="14" d="M17 14H20C20.55 14 21 13.55 21 13V10C21 9.45 20.55 9 20 9H17"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="14;28"/></path></g><mask id="lineMdCoffeeLoop0"><path fill="none" stroke="#fff" stroke-width="2" d="M8 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4M12 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4M16 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4"><animateMotion calcMode="linear" dur="3s" path="M0 0v-8" repeatCount="indefinite"/></path></mask><rect width="24" height="0" y="7" fill="currentColor" mask="url(#lineMdCoffeeLoop0)"><animate fill="freeze" attributeName="y" begin="0.8s" dur="0.6s" values="7;2"/><animate fill="freeze" attributeName="height" begin="0.8s" dur="0.6s" values="0;5"/></rect></svg>',
    customPrimaryColor: '#1095c1',
    customPrimaryColorVariant: '#07495f',
    customFontColor: '#f0f0f0'
  };

  // Custom variants example
  const CUSTOM_VARIANTS = {
    error: {
      // Override the default error variant
      primaryColor: '#009739',
      primaryColorVariant: '#FEDD00',
      fontColor: '#FEDD00'
    },
    customVariant: {
      primaryColor: '#22838d',
      primaryColorVariant: '#0a1415',
      fontColor: '#ffffff'
    }
  };

  let errorVariantOverridingNotification = {
    title: 'Override the default error variant',
    message: 'This is a notification',
    variant: 'error',
    variants: CUSTOM_VARIANTS
  };

  let customVariantNotification = {
    title: 'Custom variant',
    message: 'This is a notification',
    variant: 'customVariant',
    variants: CUSTOM_VARIANTS
  };

  function showNotifications() {
    notificationService?.push(successNotificationCustomIcon);
    notificationService?.push(customColorNotification);
    notificationService?.push(errorVariantOverridingNotification);
    notificationService?.push(customVariantNotification);
  }
</script>

<NotificationService bind:this={notificationService} location="top" />
<button on:click={showNotifications}>Show Notifications</button>
```

**Result**

![notification-custom-colors-screenshot]

<p align="right">(<a href="https://svelte.dev/repl/72521d51a438466eb55445975d926902" target="_blank">Try it on Svelte REPL</a>)</p>

### How to modify the position of the notifications

This example uses five `NotificationService` components to display notifications at different positions.

```svelte
<script>
  import { NotificationService } from '@dflare/svelte-enhanced-notifications';

  const CUSTOM_LOCATIONS = {
    top: {
      // Override the default top location
      position: 'fixed',
      top: '100px',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      zIndex: '1',
      transform: 'translate(-50%, 0)'
    },
    customLocation: {
      position: 'fixed',
      top: '25%',
      left: 'auto',
      right: 'auto',
      bottom: 'auto',
      zIndex: '1',
      transform: 'rotate(20deg)'
    }
  };

  let topNotificationService;
  let centerNotificationService;
  let bottomNotificationService;
  let customTopNotificationService;
  let customLocationNotificationService;

  let topNotification = {
    title: 'Top notification',
    variant: 'success',
    message: 'This is a notification'
  };
  let centerNotification = {
    title: 'Center notification',
    variant: 'warning',
    message: 'This is a notification'
  };
  let bottomNotification = {
    title: 'Bottom notification',
    variant: 'error',
    message: 'This is a notification'
  };
  let topOverridingNotification = {
    title: 'Override the default top location',
    variant: 'info',
    message: 'This is a notification'
  };
  let customLocationNotification = {
    title: 'New custom location',
    variant: 'help',
    message: 'This is a notification'
  };

  function showNotifications() {
    topNotificationService?.push(topNotification);
    centerNotificationService?.push(centerNotification);
    bottomNotificationService?.push(bottomNotification);
    customTopNotificationService?.push(topOverridingNotification);
    customLocationNotificationService?.push(customLocationNotification);
  }
</script>

<NotificationService bind:this={topNotificationService} location="top" />
<NotificationService bind:this={centerNotificationService} location="center" />
<NotificationService bind:this={bottomNotificationService} location="bottom" />
<NotificationService
  bind:this={customTopNotificationService}
  location="top"
  locations={CUSTOM_LOCATIONS}
/>
<NotificationService
  bind:this={customLocationNotificationService}
  location="customLocation"
  locations={CUSTOM_LOCATIONS}
/>
<button on:click={showNotifications}>Show Notifications</button>
```

**Result**

![notifications-locations-screenshot]

<p align="right">(<a href="https://svelte.dev/repl/9b91a551dbed4bd5b1ba33b491b10039" target="_blank">Try it on Svelte REPL</a>)</p>

<a id="how-to-use-an-arbitrary-array-as-a-notification-container-and-share-it-among-multiple-notificationservice-component"></a>

### How to share a notification array between multiple NotificationService components

The following examples bind three `NotificationService` components to the same notification array. Add a notification with the `push` method of any of these components or with the `pushNotification` utility. All three services display the shared notifications.

```svelte
<script>
  import { NotificationService } from '@dflare/svelte-enhanced-notifications';

  let notificationServiceTop;
  let notificationServiceCenter;
  let notificationServiceBottom;

  // A helper that calls the push method of one of the shared services
  const pushNotification = (notification) => notificationServiceTop?.push(notification);

  // The notification array shared by the services
  let notifications = [];

  let myNotification = {
    title: 'Success notification',
    message: 'This is a success notification',
    variant: 'success',
    autoDismissible: true,
    showCountdown: true
  };

  function showNotification() {
    pushNotification(myNotification);
  }
</script>

<NotificationService bind:this={notificationServiceTop} bind:notifications location="top" />
<NotificationService bind:this={notificationServiceCenter} bind:notifications location="center" />
<NotificationService bind:this={notificationServiceBottom} bind:notifications location="bottom" />
<button on:click={showNotification}>Show Notification</button>
```

<p align="right">(<a href="https://svelte.dev/repl/ab682b7d97a948d9806af9d32daba521" target="_blank">Try it on Svelte REPL</a>)</p>

The next example uses the `pushNotification` utility instead of a component’s `push` method.

```svelte
<script>
  import { NotificationService } from '@dflare/svelte-enhanced-notifications';
  import { pushNotification } from '@dflare/svelte-enhanced-notifications';

  let notificationServiceTop;
  let notificationServiceCenter;
  let notificationServiceBottom;

  // The notification array shared by the services
  let notifications = [];

  let myNotification = {
    title: 'Success notification',
    message: 'This is a success notification',
    variant: 'success',
    autoDismissible: true,
    showCountdown: true
  };

  function showNotification() {
    notifications = pushNotification(myNotification, notifications);
  }
</script>

<NotificationService bind:this={notificationServiceTop} bind:notifications location="top" />
<NotificationService bind:this={notificationServiceCenter} bind:notifications location="center" />
<NotificationService bind:this={notificationServiceBottom} bind:notifications location="bottom" />
<button on:click={showNotification}>Show Notification</button>
```

<p align="right">(<a href="https://svelte.dev/repl/d5a8e4bd4e53449e84fd3d321f5fd1bb" target="_blank">Try it on Svelte REPL</a>)</p>

The next example uses a Svelte writable store to share the notification array.

**store.js**

```js
import { writable } from 'svelte/store';
export const notifications = writable([]);
```

**App.svelte**

```svelte
<script>
  import { NotificationService } from '@dflare/svelte-enhanced-notifications';

  // A writable store containing the shared notification array
  import { notifications } from './store.js';

  let notificationServiceTop;
  let notificationServiceCenter;
  let notificationServiceBottom;

  // A helper that calls the push method of one of the shared services
  const pushNotification = (notification) => notificationServiceTop?.push(notification);

  let myNotification = {
    title: 'Success notification',
    message: 'This is a success notification',
    variant: 'success',
    autoDismissible: true,
    showCountdown: true
  };

  function showNotification() {
    pushNotification(myNotification);
  }
</script>

<NotificationService
  bind:this={notificationServiceTop}
  bind:notifications={$notifications}
  location="top"
/>
<NotificationService
  bind:this={notificationServiceCenter}
  bind:notifications={$notifications}
  location="center"
/>
<NotificationService
  bind:this={notificationServiceBottom}
  bind:notifications={$notifications}
  location="bottom"
/>
<button on:click={showNotification}>Show Notification</button>
```

<p align="right">(<a href="https://svelte.dev/repl/1fe266f67d3a49fdb82724ecb80a1b9c" target="_blank">Try it on Svelte REPL</a>)</p>

The next example uses the `pushNotification` utility instead of a component’s `push` method.

**store.js**

```js
import { writable } from 'svelte/store';
export const notifications = writable([]);
```

**App.svelte**

```svelte
<script>
  import { NotificationService } from '@dflare/svelte-enhanced-notifications';
  import { pushNotification } from '@dflare/svelte-enhanced-notifications';
  import { notifications } from './store.js';

  let notificationServiceTop;
  let notificationServiceCenter;
  let notificationServiceBottom;

  let myNotification = {
    title: 'Success notification',
    message: 'This is a success notification',
    variant: 'success',
    autoDismissible: true,
    showCountdown: true
  };

  function showNotification() {
    $notifications = pushNotification(myNotification, $notifications);
  }
</script>

<NotificationService
  bind:this={notificationServiceTop}
  bind:notifications={$notifications}
  location="top"
/>
<NotificationService
  bind:this={notificationServiceCenter}
  bind:notifications={$notifications}
  location="center"
/>
<NotificationService
  bind:this={notificationServiceBottom}
  bind:notifications={$notifications}
  location="bottom"
/>
<button on:click={showNotification}>Show Notification</button>
```

<p align="right">(<a href="https://svelte.dev/repl/a88db197062f40868821018261f9056f" target="_blank">Try it on Svelte REPL</a>)</p>

### How to create custom notifications

This example creates a custom notification component for `NotificationService`. It wraps the default `Notification` component, forwards its close event, and replaces the icon and content through its two named slots. The icon is implemented in a separate `CustomIcon` component.

You can also build a notification from scratch. Accept the notification properties you need and forward a `click` event from the close control, or invoke the supplied `onclick` callback. `NotificationService` handles automatic dismissal.

**App.svelte**

```svelte
<script>
  import { NotificationService } from '@dflare/svelte-enhanced-notifications';
  import CustomNotification from './CustomNotification.svelte';

  let notificationService;

  let myNotification1 = {
    component: CustomNotification,
    title: 'Success notification',
    message: 'This is a notification',
    variant: 'success'
  };

  let myNotification2 = {
    component: CustomNotification,
    title: 'Success notification',
    message: 'This is a notification',
    variant: 'customVariant'
  };

  function showNotification() {
    notificationService?.push(myNotification1);
    notificationService?.push(myNotification2);
  }
</script>

<NotificationService bind:this={notificationService} />
<button on:click={showNotification}>Show Notification</button>
```

**CustomNotification.svelte**

```svelte
<script>
  import { Notification } from '@dflare/svelte-enhanced-notifications';
  import CustomIcon from './CustomIcon.svelte';

  // Custom variants
  const CUSTOM_VARIANTS = {
    customVariant: {
      primaryColor: '#1095c1',
      primaryColorVariant: '#07495f',
      fontColor: '#f0f0f0'
    }
  };

  // Properties passed from NotificationService to the default Notification component.
  export let title = undefined;
  export let message = undefined;
  export let variant = undefined;
  export let variants = CUSTOM_VARIANTS;
  export let customIconSvg = undefined;
  export let customPrimaryColor = undefined;
  export let customPrimaryColorVariant = undefined;
  export let customFontColor = undefined;
  export let showCloseButton = true;
  export let autoDismissible = false;
  export let showCountdown = false;
  export let countdownDuration = 3000;
  export let countdownStart = false;
  export let customWidth = undefined;
</script>

<!-- Default Notification component -->
<Notification
  on:click
  {title}
  {message}
  {variant}
  {variants}
  {customIconSvg}
  {customPrimaryColor}
  {customPrimaryColorVariant}
  {customFontColor}
  {showCloseButton}
  {autoDismissible}
  {showCountdown}
  {countdownDuration}
  {countdownStart}
  {customWidth}
>
  <div slot="icon">
    <CustomIcon />
  </div>
  <div slot="content">
    <details>
      <summary>Section 1</summary>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua.
      </p>
    </details>
    <details>
      <summary>Section 2</summary>
      <p>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </details>
    <details>
      <summary>Section 3</summary>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur.
      </p>
    </details>
  </div>
</Notification>
```

**CustomIcon.svelte**

```svelte
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <g
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
  >
    <path stroke-dasharray="48" stroke-dashoffset="48" d="M17 9v9a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9z">
      <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="48;0" />
    </path>
    <path
      stroke-dasharray="14"
      stroke-dashoffset="14"
      d="M17 14H20C20.55 14 21 13.55 21 13V10C21 9.45 20.55 9 20 9H17"
    >
      <animate
        fill="freeze"
        attributeName="stroke-dashoffset"
        begin="0.6s"
        dur="0.2s"
        values="14;28"
      />
    </path>
  </g>
  <mask id="lineMdCoffeeLoop0">
    <path
      fill="none"
      stroke="#fff"
      stroke-width="2"
      d="M8 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4M12 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4M16 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4"
    >
      <animateMotion calcMode="linear" dur="3s" path="M0 0v-8" repeatCount="indefinite" />
    </path>
  </mask>
  <rect width="24" height="0" y="7" fill="currentColor" mask="url(#lineMdCoffeeLoop0)">
    <animate fill="freeze" attributeName="y" begin="0.8s" dur="0.6s" values="7;2" />
    <animate fill="freeze" attributeName="height" begin="0.8s" dur="0.6s" values="0;5" />
  </rect>
</svg>
```

**Result**

![notification-custom-component-screenshot]

<p align="right">(<a href="https://svelte.dev/repl/1ba18683422c41f2960055ee28c9dd1b" target="_blank">Try it on Svelte REPL</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See [LICENSE.md][license-url] for more information.

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
[SvelteKit-url]: https://svelte.dev/docs/kit
[notifications-screenshot]: https://github.com/francescodessi/svelte-enhanced-notifications/raw/main/static/notifications-screenshot.png
[notification-success-screenshot]: https://github.com/francescodessi/svelte-enhanced-notifications/raw/main/static/notification-success-screenshot.png
[notification-warning-screenshot]: https://github.com/francescodessi/svelte-enhanced-notifications/raw/main/static/notification-warning-screenshot.png
[notification-custom-colors-screenshot]: https://github.com/francescodessi/svelte-enhanced-notifications/raw/main/static/notification-custom-colors-screenshot.png
[notifications-locations-screenshot]: https://github.com/francescodessi/svelte-enhanced-notifications/raw/main/static/notifications-locations-screenshot.png
[notification-custom-component-screenshot]: https://github.com/francescodessi/svelte-enhanced-notifications/raw/main/static/notification-custom-component-screenshot.png
