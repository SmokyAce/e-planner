import { fromJS } from 'immutable';
import auth from '../../../utils/auth';
import * as actionTypes from './actionTypes';


// The initial state of the App
const initialState = fromJS({
    loggedIn             : auth.loggedIn(),
    sendEmailVerification: false,
    changedEmailSucceeded: false,
    changedPwdSucceeded  : false
});

const AUTH_ACTION_HANDLERS = {
    [actionTypes.CHANGE_FORM]: (state, action) => {
        return state
            .setIn(['formState', action.name], action.value);
    },
    [actionTypes.SET_AUTH]: (state, action) => {
        return state
            .set('loggedIn', action.payload);
    },
    [actionTypes.SET_AUTH_INFO]: (state, action) => {
        return state
            .set('currentUser', fromJS(action.payload));
    },
    [actionTypes.SET_ERROR_MESSAGE]: (state, action) => {
        return state
            .set('message', action.error);
    },
    [actionTypes.REGISTER_VERIFICATION_SUCCESS]: (state) => {
        return state
            .set('sendEmailVerification', true);
    },
    [actionTypes.REGISTER_VERIFICATION_FAILURE]: (state, action) => {
        return state
            .set('sendEmailVerification', false)
            .set('message', action.error.message);
    },
    [actionTypes.CHANGE_USER_EMAIL_SUCCESS]: (state) => {
        return state
            .set('changedEmailSucceeded', true);
    },
    [actionTypes.CHANGE_USER_EMAIL_FAILURE]: (state) => {
        return state
            .set('changedEmailSucceeded', false);
    },
    [actionTypes.CHANGE_USER_PASSWORD_SUCCESS]: (state) => {
        return state
            .set('changedPwdSucceeded', true);
    },
    [actionTypes.CHANGE_USER_PASSWORD_FAILURE]: (state) => {
        return state
            .set('changedPwdSucceeded', false);
    }
};

export default function authReducer(state = initialState, action) {
    const handler = AUTH_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
