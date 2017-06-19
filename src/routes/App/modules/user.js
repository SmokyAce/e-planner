import { Map } from 'immutable';
import { LOGOUT } from '../../AppAuth/modules/actionTypes';
import { REHYDRATE } from 'redux-persist/constants';

// ------------------------------------
// Constants
// ------------------------------------
const FETCH_USER_DATA_REQUEST = 'app/FETCH_USER_DATA_REQUEST';
const FETCH_USER_DATA_SUCCESS = 'app/FETCH_USER_DATA_SUCCESS';
const FETCH_USER_DATA_FAILURE = 'app/FETCH_USER_DATA_FAILURE';

const SAVE_USER_DATA         = 'app/SAVE_USER_DATA';
const SAVE_USER_DATA_REQUEST = 'app/SAVE_USER_DATA_REQUEST';
const SAVE_USER_DATA_SUCCESS = 'app/SAVE_USER_DATA_SUCCESS';
const SAVE_USER_DATA_FAILURE = 'app/SAVE_USER_DATA_FAILURE';

export const type = {
    FETCH_USER_DATA_REQUEST,
    FETCH_USER_DATA_SUCCESS,
    SAVE_USER_DATA
};

// ------------------------------------
// Actions
// ------------------------------------
export const fetchUserDataSuccess = (userData) => ({
    type   : FETCH_USER_DATA_SUCCESS,
    payload: userData
});

export const fetchUserDataFailure = (error) => ({
    type: FETCH_USER_DATA_FAILURE,
    error
});

export const saveUserData = (values) => ({
    type   : SAVE_USER_DATA,
    payload: values
});

export const saveUserDataAction = (_type, error = '') => {
    switch (_type) {
        case 'request':
            return { type: SAVE_USER_DATA_REQUEST };
        case 'success':
            return { type: SAVE_USER_DATA_SUCCESS };
        case 'failure':
            return { type: SAVE_USER_DATA_FAILURE, error };
        default:
            return {};
    }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null;

const USERS_ACTION_HANDLERS = {
    [FETCH_USER_DATA_SUCCESS]: (state, action) => {
        return Map(action.payload);
    },
    [SAVE_USER_DATA]: (state, action) => {
        return state.merge(action.payload);
    },
    [LOGOUT]   : () => null,
    [REHYDRATE]: (state, action) => {
        const incoming = action.payload.app;

        if (incoming && incoming.get('user')) {
            return incoming.get('user');
        }
        return state;
    }
};

export default function usersReducer(state = initialState, action) {
    const handler = USERS_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
