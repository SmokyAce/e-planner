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
            .setIn(['formState', action.name], action.value);
    },
    [actions.SET_AUTH]: (state, action) => {
        return state
            .set('loggedIn', action.payload);
    },
    [actions.SET_ERROR_MESSAGE]: (state, action) => {
        return state
            .set('message', action.error);
    }
};

export default function authReducer(state = initialState, action) {
    const handler = AUTH_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
