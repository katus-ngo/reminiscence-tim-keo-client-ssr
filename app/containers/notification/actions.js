export const FETCH_NOTIFICATIONS_REQUEST = 'app/containers/notification/FETCH_NOTIFICATIONS_REQUEST';
export const FETCH_NOTIFICATIONS_RESPONSE = 'app/containers/notification/FETCH_NOTIFICATIONS_RESPONSE';

export const COUNT_UNVIEWED_REQUEST = 'app/containers/notification/COUNT_UNVIEWED_REQUEST';
export const COUNT_UNVIEWED_RESPONSE = 'app/containers/notification/COUNT_UNVIEWED_RESPONSE';

export const VIEW_ALL_REQUEST = 'app/containers/notification/VIEW_ALL_REQUEST';
export const VIEW_ALL_RESPONSE = 'app/containers/notification/VIEW_ALL_RESPONSE';

export const fetchNotifications = () => ({type: FETCH_NOTIFICATIONS_REQUEST});
export const countUnviewedNotifications = () => ({type: COUNT_UNVIEWED_REQUEST});
export const viewAllNotifications = () => ({type: VIEW_ALL_REQUEST});