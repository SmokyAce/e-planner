import { fromJS } from 'immutable';
import { REHYDRATE } from 'redux-persist/constants';


// ------------------------------------
// Constants
// ------------------------------------
const APP_SYNC_REQUEST   = 'APP_SYNC_REQUEST';
const APP_SYNC_SUCCESS   = 'APP_SYNC_SUCCESS';
const APP_SYNC_FAILURE   = 'APP_SYNC_FAILURE';
const FIREBASE_CONNECTED = 'FIREBASE_CONNECTED';

// ------------------------------------
// Actions
// ------------------------------------
const appSyncRequest = () => ({ type: APP_SYNC_REQUEST });

const appSyncSuccess = () => ({ type: APP_SYNC_SUCCESS });

const appSyncFailure = (error) => ({ type: APP_SYNC_FAILURE, error });

const changeFirebaseConnectionStatus = (status) => ({ type: FIREBASE_CONNECTED, payload: status });

export const actions = {
    appSyncRequest,
    appSyncSuccess,
    appSyncFailure,
    changeFirebaseConnectionStatus
};

// ------------------------------------
// Reducer
// ------------------------------------
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
    [FIREBASE_CONNECTED]: (state, action) => state.set('connection', action.payload ? 'Online' : 'Offline'),
    [REHYDRATE]         : (state, action) => {
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
