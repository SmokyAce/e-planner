import { fromJS } from 'immutable';


// ------------------------------------
// Constants
// ------------------------------------
export const APP_SYNC_REQUEST    = 'APP_SYNC_REQUEST';
export const APP_SYNC_SUCCESS    = 'APP_SYNC_SUCCESS';
export const APP_SYNC_FAILURE    = 'APP_SYNC_FAILURE';
export const FIREBASE_CONNECTED = 'FIREBASE_CONNECTED';
export const FIREBASE_DISCONNECTED = 'FIREBASE_DISCONNECTED';


// ------------------------------------
// Actions
// ------------------------------------

/**
 * Tells the app we want to fetch a user info
 */

// The initial state of the App
const initialState = fromJS({
    connection: 'Online',
    isSync    : true
});

const STATUS_ACTION_HANDLERS = {
    [APP_SYNC_REQUEST]: (state) => {
        return state
            .set('isSync', false);
    },
    [APP_SYNC_SUCCESS]: (state) => {
        return state
            .set('isSync', true);
    },
    [FIREBASE_DISCONNECTED]: (state) => {
        return state
            .set('connection', 'Offline');
    },
    [FIREBASE_CONNECTED]: (state) => {
        return state
            .set('connection', 'Online');
    }
};

export default function statusReducer(state = initialState, action) {
    const handler = STATUS_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
