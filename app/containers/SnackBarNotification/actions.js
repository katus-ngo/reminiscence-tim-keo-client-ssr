export const ENQUEUE_SNACKBAR = 'app/containers/SnackBarNotification/ENQUEUE_SNACKBAR';
export const CLOSE_SNACKBAR = 'app/containers/SnackBarNotification/CLOSE_SNACKBAR';
export const REMOVE_SNACKBAR = 'app/containers/SnackBarNotification/REMOVE_SNACKBAR';

export const enqueueSnackbar = notification => {
    const key = notification.options && notification.options.key;
    return {
        type: ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        },
    };
};

export const closeSnackbar = key => ({
    type: CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key,
});

export const removeSnackbar = key => ({
    type: REMOVE_SNACKBAR,
    key,
});
