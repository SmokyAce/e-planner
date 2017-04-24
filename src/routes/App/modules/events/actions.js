// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_EVENT_REQUEST = 'FETCH_EVENT_REQUEST';
export const FETCH_EVENT_SUCCESS = 'FETCH_EVENT_SUCCESS';
export const FETCH_EVENT_FAILURE = 'FETCH_EVENT_FAILURE';

export const ADD_EVENT_REQUEST = 'ADD_EVENT_REQUEST';
export const ADD_EVENT_SUCCESS = 'ADD_EVENT_SUCCESS';
export const ADD_EVENT_FAILURE = 'ADD_EVENT_FAILURE';

export const REMOVE_EVENT_REQUEST = 'REMOVE_EVENT_REQUEST';
export const REMOVE_EVENT_SUCCESS = 'REMOVE_EVENT_SUCCESS';
export const REMOVE_EVENT_FAILURE = 'REMOVE_EVENT_FAILURE';

export const TOGGLE_EVENT_SERVICE       = 'TOGGLE_EVENT_SERVICE';
export const EVENT_NAME_CHANGE          = 'EVENT_NAME_CHANGE';
export const EVENT_SETTINGS_NAME_CHANGE = 'EVENT_SETTINGS_NAME_CHANGE';
export const SAVE_EVENT_SETTINGS        = 'SAVE_EVENT_SETTINGS';

// ------------------------------------
// Actions
// ------------------------------------
export const addEvent = (payload) => ({
    type: ADD_EVENT_REQUEST,
    payload
});

export const fetchEvent = () => ({
    type: FETCH_EVENT_REQUEST
});

export const toggleEventService = (eventId, service, checked) => ({
    type: 'TOGGLE_EVENT_SERVICE',
    eventId,
    service,
    checked
});

export const onEventNameChange = (eventName) => ({
    type   : 'EVENT_NAME_CHANGE',
    payload: eventName
});

export const onEventSettingsNameChange = (eventName) => ({
    type   : 'EVENT_SETTINGS_NAME_CHANGE',
    payload: eventName
});

export const saveEventSettings = (eventId, newEventName) => ({
    type: 'SAVE_EVENT_SETTINGS',
    eventId,
    newEventName
});
