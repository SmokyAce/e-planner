import { fromJS } from 'immutable';
import * as actions from './actions';
import {
    COUNTER_INCREMENT, COUNTER_DOUBLE_ASYNC
} from '../../../Counter/modules/counter';
import { REHYDRATE } from 'redux-persist/constants';


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
    [actions.ADD_EVENT]: (state, action) => {
        return state
            .updateIn(['listOfIds'], list => list.push(action.payload.id))
            .setIn(['byIds', action.payload.id], fromJS(action.payload))
            .setIn(['byIds', action.payload.id, 'isSync'], false)
            .setIn(['formState', 'eventName'], '');
    },
    [actions.ADD_EVENT_SUCCESS]: (state, action) => {
        return state
            .setIn(['byIds', action.payload, 'isSync'], true);
    },
    [actions.ADD_EVENT_FAILURE]: (state, action) => {
        return state
            .setIn(['byIds', action.payload, 'isSync'], false);
    },
    [actions.FETCH_EVENT_SUCCESS]: (state, action) => {
        return state
            .set('listOfIds', fromJS(action.payload.result))
            .set('byIds', fromJS(action.payload.response));
    },
    [actions.TOGGLE_EVENT_SERVICE]: (state, action) => {
        return state
            .setIn(['byIds', action.eventId, 'services', action.service], action.checked);
    },
    [actions.EVENT_NAME_CHANGE]: (state, action) => {
        return state
            .setIn(['formState', 'eventName'], action.payload);
    },
    [actions.EVENT_SETTINGS_NAME_CHANGE]: (state, action) => {
        return state
            .setIn(['settingsFormState', 'name'], action.payload)
            .setIn(['settingsFormState', 'isChanged'], true);
    },
    [actions.SAVE_EVENT_SETTINGS]: (state, action) => {
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
