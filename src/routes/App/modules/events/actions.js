import { firebaseDb } from '../../../../utils/firebaseTools';


// ------------------------------------
// Constants
// ------------------------------------
const FETCH_EVENT_REQUEST = 'FETCH_EVENT_REQUEST';
const FETCH_EVENT_SUCCESS = 'FETCH_EVENT_SUCCESS';
const FETCH_EVENT_FAILURE = 'FETCH_EVENT_FAILURE';

export const ADD_EVENT = 'ADD_EVENT';
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

export const types = {
    FETCH_EVENT_REQUEST
}

// ------------------------------------
// Actions
// ------------------------------------
const defaultServices = {
    counter    : true,
    guests     : true,
    todos      : true,
    budjet     : false,
    timing     : false,
    contractors: false,
    blog       : false,
    quiz       : false,
    notebook   : false
};

export const addEvent = (options) => {
    const payload = { ...options };

    console.log(payload);

    payload.id = firebaseDb.ref().child('events').push().key;
    payload.services = defaultServices;

    return ({
        type: ADD_EVENT,
        payload
    });
};

export const fetchEventRequest = () => ({
    type: FETCH_EVENT_REQUEST
});

export const fetchEventSuccess = (response) => ({
    type   : FETCH_EVENT_SUCCESS,
    payload: response
});

export const fetchEventFailure = (error) => ({
    type: FETCH_EVENT_FAILURE,
    error
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
