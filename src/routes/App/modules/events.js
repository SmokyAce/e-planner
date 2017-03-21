import { fromJS } from 'immutable';
import _ from 'lodash';

import {
    COUNTER_INCREMENT, COUNTER_DOUBLE_ASYNC
} from '../../Counter/modules/counter';


// ------------------------------------
// Constants
// ------------------------------------
export const ADD_EVENT         = 'ADD_EVENT';
export const ADD_EVENT_SERVICE = 'ADD_EVENT_SERVICE';
export const EVENT_NAME_CHANGE = 'EVENT_NAME_CHANGE';


// ------------------------------------
// Actions
// ------------------------------------
export const addEvent = (options) => {
    const id = _.uniqueId();

    options.counter = 0;

    return {
        type   : 'ADD_EVENT',
        payload: { id, options }
    };
};

export const addServiceToEvent = (service) => ({
    type   : 'ADD_EVENT_SERVICE',
    payload: service
});

export const onEventNameChange = (eventName) => ({
    type   : 'EVENT_NAME_CHANGE',
    payload: eventName
});


// The initial state of the Events reducer
const initialEventId = _.uniqueId();

const initialState = fromJS({
    listOfIds: [initialEventId],
    byIds    : {
        [initialEventId]: {
            name    : 'My first event',
            services: ['Counter', 'Todos', 'Guests', 'Budjet', 'Timing', 'Contractors', 'Blog', 'Quiz', 'Notebook'],
            counter : 1
        }
    },
    formState: {
        eventName: '',
        services : []
    }
});


const EVENTS_ACTION_HANDLERS = {
    [ADD_EVENT]: (state, action) => {
        return state
            .updateIn(['listOfIds'], list => list.push(action.payload.id))
            .setIn(['byIds', action.payload.id], fromJS(action.payload.options))
            .set('formState', fromJS({ eventName: '', services: [] }));
    },
    [ADD_EVENT_SERVICE]: (state, action) => {
        return state
            .updateIn(['formState', 'services'], list => list.push(action.payload));
    },
    [EVENT_NAME_CHANGE]: (state, action) => {
        return state
            .setIn(['formState', 'eventName'], action.payload);
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
