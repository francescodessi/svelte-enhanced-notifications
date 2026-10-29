/** @typedef {import('./types.js').NotificationProps} NotificationProps */
/** @typedef {import('./types.js').NotificationOptions} NotificationOptions */
/** @typedef {import('./types.js').NotificationServiceProps} NotificationServiceProps */
import NotificationService from './components/NotificationService.svelte';
import Notification from './components/Notification.svelte';
import { pushNotification } from './utilities.js';
export { NotificationService, Notification, pushNotification };
