import { fromJS } from 'immutable';


// ------------------------------------
// Constants
// ------------------------------------
const APP_START_SYNC  = 'app/START_SYNC';
const APP_FINISH_SYNC = 'app/FINISH_SYNC';
const APP_ERROR_SYNC  = 'app/ERROR_SYNC';

export const types = {
    APP_START_SYNC
};

// ------------------------------------
// Actions
// ------------------------------------
export const startSync = () => ({
    type: APP_START_SYNC
});

export const finishSync = () => ({
    type: APP_FINISH_SYNC
});

export const errorSync = (error) => ({
    type: APP_ERROR_SYNC,
    error
});

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({
    lastTime: '',
    status  : '',
    error   : ''
});

const STATUS_ACTION_HANDLERS = {
    [APP_START_SYNC]: (state) => {
        return state
            .set('status', 'start');
    },
    [APP_FINISH_SYNC]: (state) => {
        return state
            .set('lastTime', new Date())
            .set('status', 'completed');
    },
    [APP_ERROR_SYNC]: (state, action) => {
        return state
            .set('error', action.error.message)
            .set('status', 'error');
    }
};

export default function statusReducer(state = initialState, action) {
    const handler = STATUS_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
