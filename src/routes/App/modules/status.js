import { fromJS } from 'immutable';


// ------------------------------------
// Constants
// ------------------------------------
export const APP_SYNC_REQUEST    = 'APP_SYNC_REQUEST';
export const APP_SYNC_SUCCESS    = 'APP_SYNC_SUCCESS';
export const APP_SYNC_FAILURE    = 'APP_SYNC_FAILURE';
export const FIREBASE_CONNECTED = 'FIREBASE_CONNECTED';


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
    [FIREBASE_CONNECTED]: (state, action) => state.set('connection', action.payload ? 'Online' : 'Offline')
};

export default function statusReducer(state = initialState, action) {
    const handler = STATUS_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
