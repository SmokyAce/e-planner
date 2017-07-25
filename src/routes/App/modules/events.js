import { fromJS } from 'immutable';
import {
    COUNTER_INCREMENT, COUNTER_DOUBLE_ASYNC
} from '../../Counter/modules/counter';
import { REHYDRATE } from 'redux-persist/constants';
import { firebaseDb } from '../../../utils/firebaseTools';


// ------------------------------------
// Constants
// ------------------------------------
const FETCH_EVENT_REQUEST = 'FETCH_EVENT_REQUEST';
const FETCH_EVENT_SUCCESS = 'FETCH_EVENT_SUCCESS';
const FETCH_EVENT_FAILURE = 'FETCH_EVENT_FAILURE';

const ADD_EVENT = 'ADD_EVENT';
const ADD_EVENT_REQUEST = 'ADD_EVENT_REQUEST';
const ADD_EVENT_SUCCESS = 'ADD_EVENT_SUCCESS';
const ADD_EVENT_FAILURE = 'ADD_EVENT_FAILURE';

const REMOVE_EVENT = 'REMOVE_EVENT';
// const REMOVE_EVENT_REQUEST = 'REMOVE_EVENT_REQUEST';
// const REMOVE_EVENT_SUCCESS = 'REMOVE_EVENT_SUCCESS';
// const REMOVE_EVENT_FAILURE = 'REMOVE_EVENT_FAILURE';

const TOGGLE_EVENT_SERVICE = 'TOGGLE_EVENT_SERVICE';
const EVENT_NAME_CHANGE = 'EVENT_NAME_CHANGE';
const EVENT_SETTINGS_NAME_CHANGE = 'EVENT_SETTINGS_NAME_CHANGE';
const SAVE_EVENT_SETTINGS = 'SAVE_EVENT_SETTINGS';

export const types = {
    FETCH_EVENT_REQUEST,
    ADD_EVENT
};

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

// ------------------------------------
// Actions
// ------------------------------------


export const addEvent = (options) => {
    const payload = { ...options };

    payload.id = firebaseDb.ref().child('events').push().key;
    payload.services = defaultServices;

    return ({
        type: ADD_EVENT,
        payload
    });
};

export const removeEvent = (id) => ({
    type   : REMOVE_EVENT,
    payload: id
});

export const addEventRequest = () => ({
    type: ADD_EVENT_REQUEST
});
export const addEventSuccess = (eventId) => ({
    type   : ADD_EVENT_SUCCESS,
    payload: eventId
});

export const addEventFailure = (eventId, error) => ({
    type   : ADD_EVENT_FAILURE,
    payload: eventId,
    error
});

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


const initialState = fromJS({
    listOfIds: [],
    byIds    : {},
    formState: {
        eventName: ''
    },
    settingsFormState: {
        name     : '',
        services : {},
        isChanged: false
    }
});

const EVENTS_ACTION_HANDLERS = {
    [ADD_EVENT]: (state, action) => {
        return state
            .updateIn(['listOfIds'], list => list.push(action.payload.id))
            .setIn(['byIds', action.payload.id], fromJS(action.payload))
            .setIn(['byIds', action.payload.id, 'isSync'], false)
            .setIn(['formState', 'eventName'], '');
    },
    [ADD_EVENT_SUCCESS]: (state, action) => {
        return state
            .setIn(['byIds', action.payload, 'isSync'], true);
    },
    [ADD_EVENT_FAILURE]: (state, action) => {
        return state
            .setIn(['byIds', action.payload, 'isSync'], false);
    },
    [REMOVE_EVENT]: (state, action) => {
        return state
            .updateIn(['listOfIds'], list => list.delete(list.indexOf(action.payload)))
            .deleteIn(['byIds', action.payload]);
    },
    [FETCH_EVENT_SUCCESS]: (state, action) => {
        return state
            .set('listOfIds', fromJS(action.payload.result))
            .set('byIds', fromJS(action.payload.response));
    },
    [TOGGLE_EVENT_SERVICE]: (state, action) => {
        return state
            .setIn(['byIds', action.eventId, 'services', action.service], action.checked);
    },
    [EVENT_NAME_CHANGE]: (state, action) => {
        return state
            .setIn(['formState', 'eventName'], action.payload);
    },
    [EVENT_SETTINGS_NAME_CHANGE]: (state, action) => {
        return state
            .setIn(['settingsFormState', 'name'], action.payload)
            .setIn(['settingsFormState', 'isChanged'], true);
    },
    [SAVE_EVENT_SETTINGS]: (state, action) => {
        return state
            .setIn(['byIds', action.eventId, 'name'], action.newEventName)
            .setIn(['byIds', action.eventId, 'isChanged'], false);
    },
    [COUNTER_INCREMENT]: (state, action) => {
        return state
            .setIn(['byIds', action.payload.eventId, 'counter'], (action.payload.value + 1));
    },
    [COUNTER_DOUBLE_ASYNC]: (state, action) => {
        const { eventId } = action.payload;

        return state
            .setIn(['byIds', eventId, 'counter'], (state.getIn(['byIds', eventId, 'counter']) * 2));
    },
    [REHYDRATE]: (state, action) => {
        const incoming = action.payload.app;

        if (incoming && incoming.get('events')) {
            return incoming.get('events');
        }
        return state;
    }
};

export default function eventsReducer(state = initialState, action) {
    const handler = EVENTS_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
