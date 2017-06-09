import { fromJS } from 'immutable';
import { REHYDRATE } from 'redux-persist/constants';


// ------------------------------------
// Constants
// ------------------------------------
const SET_APP_SYNC_STATUS            = 'APP_SYNC_REQUEST';
const SET_APP_INITIALIZATION_STATUS  = 'APP_INITIALIZATION';
const SET_FIREBASE_CONNECTION_STATUS = 'FIREBASE_CONNECTED';

// ------------------------------------
// Actions
// ------------------------------------
const changeAppSyncStatus = (status) => ({ type: SET_APP_SYNC_STATUS, payload: status });

const changeFirebaseConnectionStatus = (status) => ({ type: SET_FIREBASE_CONNECTION_STATUS, payload: status });

const changeAppInitializationStatus = (status) => ({ type: SET_APP_INITIALIZATION_STATUS, payload: status });

export const actions = {
    changeAppSyncStatus,
    changeFirebaseConnectionStatus,
    changeAppInitializationStatus
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({
    connection    : 'Online',
    isSync        : true,
    initialization: false
});

const STATUS_ACTION_HANDLERS = {
    [SET_APP_SYNC_STATUS]           : (state, action) => state.set('isSync', action.payload),
    [SET_APP_INITIALIZATION_STATUS] : (state, action) => state.set('initialization', action.payload),
    [SET_FIREBASE_CONNECTION_STATUS]: (state, action) => state.set('connection', action.payload ? 'Online' : 'Offline'),
    [REHYDRATE]                     : (state, action) => {
        const incoming = action.payload.app;

        if (incoming && incoming.get('status')) {
            return incoming.get('status');
        }
        return state;
    }
};

export default function statusReducer(state = initialState, action) {
    const handler = STATUS_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
