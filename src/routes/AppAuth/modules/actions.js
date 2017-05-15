import * as actionTypes from './actionTypes';


// ------------------------------------
// Actions
// ------------------------------------
/**
 * Sets the form state
 * @param  {string} name (email, password) The name of input that user change
 * @param  {string} value The value of input that user change
 */
export const changeForm = (name, value) => ({
    type: actionTypes.CHANGE_FORM,
    name,
    value
});

/**
 * Sets the message state
 * @param  {string} message The new text of the error message on the form
 */
export const setMesssage = (message) => ({
    type: actionTypes.SET_ERROR_MESSAGE,
    message
});

/**
 * Tells the app we want to update a user info
 */
export const updateUserInfoRequest = (data) => ({
    type: actionTypes.UPDATE_USER_INFO_REQUEST,
    data
});

/**
 * Tells the app we want to change a user password
 */
export const changeUserPwdRequest = (newPassword) => ({
    type: actionTypes.CHANGE_USER_PASSWORD_REQUEST, newPassword
});

/**
 * Tells the app we want to log in a user
 * @param  {object} data          The data we're sending for log in
 * @param  {string} data.username The username of the user to log in
 * @param  {string} data.password The password of the user to log in
 */
export const loginRequest = (data) => ({
    type: actionTypes.LOGIN_REQUEST,
    data
});

/**
 * Tells the app we want to log in a user
 * @param  {string} provider          The provider which selected user
 */
export const loginWithProviderRequest = (provider) => ({
    type: actionTypes.LOGIN_WITH_PROVIDER_REQUEST,
    provider
});

/**
 * Tells the app we want to logout
 */
export const logoutRequest = () => ({
    type: actionTypes.LOGOUT
});

/**
 * Tells the app we want to register a user
 * @param  {object} data          The data we're sending for registration
 * @param  {string} data.email    The email of the user to register
 * @param  {string} data.password The password of the user to register
 */
export const registerRequest = (data) => ({
    type: actionTypes.REGISTER_REQUEST,
    data
});

export function resetPasswordEmail(email) {
    return {
        type: actionTypes.RESET_PASSWORD
    };
}

export const sendEmailVerificationRequest = () => ({
    type: actionTypes.REGISTER_VERIFICATION_REQUEST
});
