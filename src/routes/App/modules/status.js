import { fromJS } from 'immutable';


// ------------------------------------
// Constants
// ------------------------------------
const APP_SYNC_STATUS_CHANGE       = 'app/SYNC_STATUS_CHANGE';
const APP_CONNECTION_STATUS_CHANGE = 'app/CONNECTION_STATUS_CHANGE';
const APP_INITIALIZATION_START     = 'app/INITIALIZATION_START';
const APP_INITIALIZATION_FINISH    = 'app/INITIALIZATION_FINISH';
const APP_INITIALIZATION_ERROR     = 'app/INITIALIZATION_ERROR';

export const types = {
    APP_INITIALIZATION_START
};

// ------------------------------------
// Actions
// ------------------------------------
export const changeAppSyncStatus            = (status) => ({ type: APP_SYNC_STATUS_CHANGE, payload: status });
export const changeFirebaseConnectionStatus = (status) => ({ type: APP_CONNECTION_STATUS_CHANGE, payload: status });
export const changeAppInitializationStatus  = (status, error = '') => {
    switch (status) {
        case 'start':
            return { type: APP_INITIALIZATION_START };
        case 'finish':
            return { type: APP_INITIALIZATION_FINISH };
        case 'error':
            return { type: APP_INITIALIZATION_ERROR, error };
        default:
            return {};
    }
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
    [APP_SYNC_STATUS_CHANGE]      : (state, action) => state.set('isSync', action.payload),
    [APP_CONNECTION_STATUS_CHANGE]: (state, action) => state.set('connection', action.payload ? 'Online' : 'Offline'),
    [APP_INITIALIZATION_START]    : (state) => state.set('isInitialized', false),
    [APP_INITIALIZATION_FINISH]   : (state) => state.set('isInitialized', true),
    [APP_INITIALIZATION_ERROR]    : (state, action) => state.set('isInitialized', action.error)
};

export default function statusReducer(state = initialState, action) {
    const handler = STATUS_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
