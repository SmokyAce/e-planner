import { fromJS } from 'immutable';
import _ from 'lodash';

import {
    COUNTER_INCREMENT, COUNTER_DOUBLE_ASYNC
} from '../../Counter/modules/counter';


// ------------------------------------
// Constants
// ------------------------------------
export const ADD_EVENT                    = 'ADD_EVENT';


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


const initialEventId = _.uniqueId();

// The initial state of the App
const initialState = fromJS({
    listOfIds: [initialEventId],
    byIds    : {
        [initialEventId]: {
            name   : 'My first event',
            counter: 1
        }
    }
});

const EVENTS_ACTION_HANDLERS = {
    [ADD_EVENT]: (state, action) => {
        return state
            .updateIn(['listOfIds'], list => list.push(action.payload.id))
            .setIn(['byIds', action.payload.id], fromJS(action.payload.options));
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
