function pushNotification(notification, notifications) {
    const NOTIFICATION_ID = notifications.length > 0 ? (Number(notifications[notifications.length - 1].id) + 1) : 0;
    notifications[notifications.length] = {id: NOTIFICATION_ID, ...notification};
    return notifications;
}

export {pushNotification};