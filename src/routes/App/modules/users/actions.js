// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_USER_DATA_REQUEST = 'FETCH_USER_DATA_REQUEST';
export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
export const FETCH_USER_DATA_FAILURE = 'FETCH_USER_DATA_FAILURE';

export const SAVE_USER_DATA         = 'SAVE_USER_DATA';
export const SAVE_USER_DATA_REQUEST = 'SET_USER_DATA_REQUEST';
export const SAVE_USER_DATA_SUCCESS = 'SET_USER_DATA_SUCCESS';
export const SAVE_USER_DATA_FAILURE = 'SET_USER_DATA_FAILURE';

// ------------------------------------
// Actions
// ------------------------------------

/**
 * Tells the app we want to fetch a user info
 */
export const fetchUserInfoRequest = () => ({
    type: FETCH_USER_DATA_REQUEST
});

/**
 * Tells the app we want to fetch a user info
 */
export const saveUserInfoRequest = (values) => ({
    type   : SAVE_USER_DATA,
    payload: values
});
