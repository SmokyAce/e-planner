import { fromJS } from 'immutable';


// ------------------------------------
// Constants
// ------------------------------------
const SET_APP_SYNC_STATUS            = 'APP_SYNC_REQUEST';
const SET_FIREBASE_CONNECTION_STATUS = 'FIREBASE_CONNECTED';
const SET_APP_INITIALIZATION_STATUS  = 'APP_INITIALIZATION';

const APP_INITIALIZATION_START       = 'APP_INITIALIZATION_START';
const APP_INITIALIZATION_END         = 'APP_INITIALIZATION_END';
const APP_INITIALIZATION_ERROR       = 'APP_INITIALIZATION_ERROR';

// ------------------------------------
// Actions
// ------------------------------------
const changeAppSyncStatus = (status) => ({ type: SET_APP_SYNC_STATUS, payload: status });

const changeFirebaseConnectionStatus = (status) => ({ type: SET_FIREBASE_CONNECTION_STATUS, payload: status });

const changeAppInitializationStatus = (status, error = '') => {
    switch (status) {
        case 'start':
            return { type: APP_INITIALIZATION_START };
        case 'end':
            return { type: APP_INITIALIZATION_END };
        case 'error':
            return { type: APP_INITIALIZATION_ERROR, error };
        default:
            return {};
    }
};

export const actions = {
    changeAppSyncStatus,
    changeFirebaseConnectionStatus,
    changeAppInitializationStatus
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({
    connection   : 'Online',
    isSync       : true,
    isInitialized: true
});

const STATUS_ACTION_HANDLERS = {
    [SET_APP_SYNC_STATUS]           : (state, action) => state.set('isSync', action.payload),
    [SET_APP_INITIALIZATION_STATUS] : (state, action) => state.set('isInitialized', action.payload),
    [SET_FIREBASE_CONNECTION_STATUS]: (state, action) => state.set('connection', action.payload ? 'Online' : 'Offline'),

    [APP_INITIALIZATION_START]: (state) => state.set('isInitialized', false),
    [APP_INITIALIZATION_END]  : (state) => state.set('initialization', true),
    [APP_INITIALIZATION_ERROR]: (state, action) => state.set('initialization', action.error)
};

export default function statusReducer(state = initialState, action) {
    const handler = STATUS_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
