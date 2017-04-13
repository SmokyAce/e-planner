import { fromJS } from 'immutable';
import _ from 'lodash';

import {
    COUNTER_INCREMENT, COUNTER_DOUBLE_ASYNC
} from '../../Counter/modules/counter';


// ------------------------------------
// Constants
// ------------------------------------
export const ADD_EVENT                  = 'ADD_EVENT';

export const ADD_EVENT_REQUEST                  = 'ADD_EVENT_REQUEST';
export const ADD_EVENT_SUCCESS                  = 'ADD_EVENT_SUCCESS';
export const ADD_EVENT_FAILURE                  = 'ADD_EVENT_FAILURE';

export const TOGGLE_EVENT_SERVICE       = 'TOGGLE_EVENT_SERVICE';
export const EVENT_NAME_CHANGE          = 'EVENT_NAME_CHANGE';
export const EVENT_SETTINGS_NAME_CHANGE = 'EVENT_SETTINGS_NAME_CHANGE';
export const SAVE_EVENT_SETTINGS        = 'SAVE_EVENT_SETTINGS';

// The initial state of the Events reducer
const initialEventId = _.uniqueId();
const defaultEventOptions = {
    id      : initialEventId,
    name    : 'My first event',
    services: {
        counter    : true,
        guests     : true,
        todos      : true,
        budjet     : false,
        timing     : false,
        contractors: false,
        blog       : false,
        quiz       : false,
        notebook   : false
    },
    counter: 1
};

// ------------------------------------
// Actions
// ------------------------------------
export const addEvent_ = (eventName) => {
    const id = _.uniqueId();

    const options = defaultEventOptions;

    options.name = eventName;

    return {
        type   : 'ADD_EVENT',
        payload: { id, options }
    };
};

export const addEvent = (payload) => ({
    type   : 'ADD_EVENT_REQUEST',
    payload
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
            .setIn(['byIds', action.payload.id], fromJS(action.payload.options))
            .setIn(['byIds', action.payload.id, 'id'], action.payload.id);
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
    }
};

export default function eventsReducer(state = initialState, action) {
    const handler = EVENTS_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
