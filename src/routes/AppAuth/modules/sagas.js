import { take, call, put, race } from 'redux-saga/effects';
import { Map } from 'immutable';
import { browserHistory } from 'react-router';

import firebaseTools from '../../../utils/firebaseTools';
import * as authActions from './auth/actions';


/**
 * Effect to handle authorization
 * @param  {object} authType               The authType containes the result of race
 */
function* authorize(authType) {
    // We then try to register or log in the user, depending on the request
    try {
        let userInfo;

        if (authType.loginWithEmail) {
            userInfo = yield firebaseTools.loginUser(authType.loginWithEmail.data);
        } else if (authType.loginWithProvider) {
            const result = yield firebaseTools.loginWithProvider(authType.loginWithProvider.provider);

            userInfo = (result.user) ? result.user : result;
        } else if (authType.registration) {
            userInfo = yield firebaseTools.registerUser(authType.registration.data);
        }

        if (userInfo.errorMessage) {
            yield put({ type: authActions.SET_ERROR_MESSAGE, error: userInfo.errorMessage });
            return false;
        }

        yield put({ type: authActions.SET_AUTH_INFO, payload: userInfo });

        return true;
    } catch (error) {
        // If we get an error we send Redux the appropiate action and return
        yield put({ type: authActions.SET_ERROR_MESSAGE, error: error.message });

        return false;
    }
}

export function* logout() {
    try {
        const result = yield call(firebaseTools.logoutUser);

        return result;
    } catch (error) {
        yield put({ type: authActions.SET_ERROR_MESSAGE, error: error.message });
    }
}


/**
 * Log in saga
 */
function* loginFlow() {
    // Because sagas are generators, doing `while (true)` doesn't block our program
    // Basically here we say "this saga is always listening for actions"
    while (true) {
        // And we're listening for `LOGIN_REQUEST` actions and destructuring its payload
        const authType = yield race({
            loginWithEmail   : take(authActions.LOGIN_REQUEST),
            loginWithProvider: take(authActions.LOGIN_WITH_PROVIDER_REQUEST),
            registration     : take(authActions.REGISTER_REQUEST)
        });

        // A `LOGOUT` action may happen while the `authorize` effect is going on, which may
        // lead to a race condition. This is unlikely, but just in case, we call `race` which
        // returns the "winner", i.e. the one that finished first
        const winner = yield race({
            auth  : call(authorize, authType),
            logout: take(authActions.LOGOUT)
        });

        // If `authorize` was the winner...
        if (winner.auth) {
            // ...we send Redux appropiate actions
            yield put({ type: authActions.SET_AUTH, payload: true }); // User is logged in (authorized)
            yield put({
                type        : authActions.CHANGE_FORM,
                newFormState: Map({ email: '', password: '', rememberMe: false })
            });

            forwardTo('/app'); // Go to dashboard page
            // If `logout` won...
        } else if (winner.logout) {
            // ...we send Redux appropiate action
            yield put({ type: authActions.SET_AUTH, payload: false }); // User is not logged in (not authorized)
            yield call(logout); // Call `logout` effect
            forwardTo('/');
        }
    }
}

/**
 * Log out saga
 * This is basically the same as the `if (winner.logout)` of above, just written
 * as a saga that is always listening to `LOGOUT` actions
 */
export function* logoutFlow() {
    while (true) {
        yield take(authActions.LOGOUT);

        yield put({ type: authActions.SET_AUTH, payload: false });

        const result = yield call(logout);

        if (result.success) {
            yield put({ type: authActions.SET_AUTH_INFO, payload: null });
            forwardTo('/');
        }
    }
}


loginFlow.isDaemon = true;

// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
export default [
    loginFlow
];

// Little helper function to abstract going to different pages
function forwardTo(location) {
    browserHistory.push(location);
}
