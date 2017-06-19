import { take, call, put, race, fork, select, cancel, takeLatest } from 'redux-saga/effects';
import { Map } from 'immutable';
import { browserHistory } from 'react-router';
// api
import firebaseTools from '../../../utils/firebaseTools';
// selectors
import { makeSelectEmailVerified } from './selectors';
// actions types
import * as actionTypes from './actionTypes';
import { LOCATION_CHANGE } from '../../../store/reducers/location';
import { CHANGE_LOCALE } from '../../../containers/LanguageProvider/module';
// actions
import { sendEmailVerificationRequest } from './actions';


/**
 * Effect to handle authorization
 * @param  {object} authType               The authType containes the result of race
 */
function * authorize(authType) {
    // We then try to register or log in the user, depending on the request
    try {
        let userInfo;

        if (authType.loginWithEmail) {
            userInfo = yield firebaseTools.loginUser(authType.loginWithEmail.data);
        } else if (authType.loginWithProvider) {
            const result = yield firebaseTools.loginWithProvider(authType.loginWithProvider.provider);

            userInfo = (result.user) ? result.user : result;

            // check if verification need
            const verified = yield select(makeSelectEmailVerified());

            if (!verified) {
                yield put(sendEmailVerificationRequest());
            }
        } else if (authType.registration) {
            userInfo = yield firebaseTools.registerUser(authType.registration.data);

            // register verification need
            yield put(sendEmailVerificationRequest());
        }

        if (userInfo.errorMessage) {
            yield put({ type: actionTypes.SET_ERROR_MESSAGE, error: userInfo.errorMessage });
            return false;
        }

        yield put({ type: actionTypes.SET_AUTH_INFO, payload: userInfo });

        return true;
    } catch (error) {
        // If we get an error we send Redux the appropiate action and return
        yield put({ type: actionTypes.SET_ERROR_MESSAGE, error: error.message });

        return false;
    }
}

export function * logout() {
    try {
        const result = yield call(firebaseTools.logoutUser);

        return result;
    } catch (error) {
        yield put({ type: actionTypes.SET_ERROR_MESSAGE, error: error.message });
    }
}

function * registerVerification() {
    yield takeLatest(actionTypes.REGISTER_VERIFICATION_REQUEST, sendEmailVerification);
}

function * sendEmailVerification() {
    const response = yield call(firebaseTools.sendEmailVerification);

    if (!response.error) {
        yield put({ type: actionTypes.REGISTER_VERIFICATION_SUCCESS });
    } else {
        yield put({ type: actionTypes.REGISTER_VERIFICATION_FAILURE, error: response.error });
    }
}

// //////////////////////////////////////
// watchers
// //////////////////////////////////////

/**
 * Log in saga
 */
function * loginFlow() {
    // Because sagas are generators, doing `while (true)` doesn't block our program
    // Basically here we say "this saga is always listening for actions"
    while (true) {
        // And we're listening for `LOGIN_REQUEST` actions and destructuring its payload
        const authType = yield race({
            loginWithEmail   : take(actionTypes.LOGIN_REQUEST),
            loginWithProvider: take(actionTypes.LOGIN_WITH_PROVIDER_REQUEST),
            registration     : take(actionTypes.REGISTER_REQUEST)
        });

        // A `LOGOUT` action may happen while the `authorize` effect is going on, which may
        // lead to a race condition. This is unlikely, but just in case, we call `race` which
        // returns the "winner", i.e. the one that finished first
        const winner = yield race({
            auth  : call(authorize, authType),
            logout: take(actionTypes.LOGOUT)
        });

        // If `authorize` was the winner...
        if (winner.auth) {
            // ...we send Redux appropiate actions
            yield put({ type: actionTypes.SET_AUTH, payload: true }); // User is logged in (authorized)
            yield put({
                type        : actionTypes.CHANGE_FORM,
                newFormState: Map({ email: '', password: '', rememberMe: false })
            });

            forwardTo('/app'); // Go to dashboard page
            // If `logout` won...
        } else if (winner.logout) {
            // ...we send Redux appropiate action
            yield put({ type: actionTypes.SET_AUTH, payload: false }); // User is not logged in (not authorized)
            yield call(logout); // Call `logout` effect
            forwardTo('/');
        }
    }
}

function * verificationFlow() {
    const verificationTask = yield fork(registerVerification);

    yield take([LOCATION_CHANGE, CHANGE_LOCALE]);
    yield cancel(verificationTask);
}

/**
 * Log out saga
 * This is basically the same as the `if (winner.logout)` of above, just written
 * as a saga that is always listening to `LOGOUT` actions
 */
export function * logoutFlow() {
    while (true) {
        yield take(actionTypes.LOGOUT);

        yield put({ type: actionTypes.SET_AUTH, payload: false });

        const result = yield call(logout);

        if (result.success) {
            yield put({ type: actionTypes.SET_AUTH_INFO, payload: null });
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
    loginFlow,
    verificationFlow
];

// Little helper function to abstract going to different pages
function forwardTo(location) {
    browserHistory.push(location);
}
