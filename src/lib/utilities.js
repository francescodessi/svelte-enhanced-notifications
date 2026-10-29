/**
 * Append a notification, returning the array for reassignment in legacy consumers.
 * @param {import('./types.js').NotificationOptions} notification
 * @param {import('./types.js').NotificationOptions[]} notifications
 */
export function pushNotification(notification, notifications) {
	const nextId = notifications.reduce(
		(max, item) =>
			typeof item.id === 'number' && Number.isFinite(item.id) ? Math.max(max, item.id + 1) : max,
		0
	);
	const id = notification.id ?? nextId;
	if (notifications.some((item) => item.id === id)) {
		throw new Error(`A notification with id "${id}" already exists`);
	}
	notifications.push({ ...notification, id });
	return notifications;
}
