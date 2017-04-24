import { fromJS } from 'immutable';
import auth from '../../../../utils/auth';
import * as actions from './actions';


// The initial state of the App
const initialState = fromJS({
    formState: {
        email         : '',
        password      : '',
        repeatPassword: '',
        rememberMe    : false,
        displayName   : ''
    },
    message : '',
    loggedIn: auth.loggedIn()
});

const AUTH_ACTION_HANDLERS = {
    [actions.CHANGE_FORM]: (state, action) => {
        return state
            .set('formState', action.newFormState);
    },
    [actions.SET_AUTH]: (state, action) => {
        return state
            .set('loggedIn', action.newAuthState);
    },
    [actions.REQUEST_ERROR]: (state, action) => {
        return state
            .set('message', action.error);
    },
    [actions.SET_MESSAGE]: (state, action) => {
        return state
            .set('message', action.message);
    }
};

export default function authReducer(state = initialState, action) {
    const handler = AUTH_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
