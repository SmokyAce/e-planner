import { fromJS } from 'immutable';


// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_USER_DATA_REQUEST = 'FETCH_USER_DATA_REQUEST';
export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
export const FETCH_USER_DATA_FAILURE = 'FETCH_USER_DATA_FAILURE';
export const SET_USER_DATA_REQUEST = 'SET_USER_DATA_REQUEST';
export const SET_USER_DATA_SUCCESS = 'SET_USER_DATA_SUCCESS';
export const SET_USER_DATA_FAILURE = 'SET_USER_DATA_FAILURE';

// ------------------------------------
// Actions
// ------------------------------------

/**
 * Tells the app we want to fetch a user info
 */
export const fetchUserInfoRequest = () => ({
    type: FETCH_USER_DATA_REQUEST
});


// The initial state of the App
const initialState = fromJS({
    currentUser: null
});

const USERS_ACTION_HANDLERS = {
    [FETCH_USER_DATA_SUCCESS]: (state, action) => {
        if (action.response) {
            return state
                .set('currentUser', action.response)
        } else {
            return state;
        }
    }
};

export default function usersReducer(state = initialState, action) {
    const handler = USERS_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
