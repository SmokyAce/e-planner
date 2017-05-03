// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_REQUEST                = 'LOGIN_REQUEST';
export const LOGIN_WITH_PROVIDER_REQUEST  = 'LOGIN_WITH_PROVIDER_REQUEST';
export const REGISTER_REQUEST             = 'REGISTER_REQUEST';
export const UPDATE_USER_INFO_REQUEST     = 'UPDATE_USER_INFO_REQUEST';
export const CHANGE_USER_PASSWORD_REQUEST = 'CHANGE_USER_PASSWORD_REQUEST';
export const LOGOUT                       = 'LOGOUT';
export const SET_AUTH_INFO                = 'SET_AUTH_INFO';
export const SET_AUTH                     = 'SET_AUTH';
export const SET_ERROR_MESSAGE            = 'SET_ERROR_MESSAGE';
export const CHANGE_FORM                  = 'CHANGE_FORM';
export const RESET_PASSWORD               = 'RESET_PASSWORD';

// ------------------------------------
// Actions
// ------------------------------------
/**
 * Sets the form state
 * @param  {string} name (email, password) The name of input that user change
 * @param  {string} value The value of input that user change
 */
export const changeForm = (name, value) => ({
    type: CHANGE_FORM,
    name,
    value
});

/**
 * Sets the message state
 * @param  {string} message The new text of the error message on the form
 */
export const setMesssage = (message) => ({
    type: SET_ERROR_MESSAGE,
    message
});

/**
 * Tells the app we want to update a user info
 */
export const updateUserInfoRequest = (data) => ({
    type: UPDATE_USER_INFO_REQUEST,
    data
});

/**
 * Tells the app we want to change a user password
 */
export const changeUserPwdRequest = (newPassword) => ({
    type: CHANGE_USER_PASSWORD_REQUEST, newPassword
});

/**
 * Tells the app we want to log in a user
 * @param  {object} data          The data we're sending for log in
 * @param  {string} data.username The username of the user to log in
 * @param  {string} data.password The password of the user to log in
 */
export const loginRequest = (data) => ({
    type: LOGIN_REQUEST,
    data
});

/**
 * Tells the app we want to log in a user
 * @param  {string} provider          The provider which selected user
 */
export const loginWithProviderRequest = (provider) => ({
    type: LOGIN_WITH_PROVIDER_REQUEST,
    provider
});

/**
 * Tells the app we want to logout
 */
export const logoutRequest = () => ({
    type: LOGOUT
});

/**
 * Tells the app we want to register a user
 * @param  {object} data          The data we're sending for registration
 * @param  {string} data.email    The email of the user to register
 * @param  {string} data.password The password of the user to register
 */
export const registerRequest = (data) => ({
    type: REGISTER_REQUEST,
    data
});

export function resetPasswordEmail(email) {
    return {
        type: RESET_PASSWORD
    };
}
