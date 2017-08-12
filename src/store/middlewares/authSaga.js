import { take, call, put, race, fork, takeLatest } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
// api
import fbTools from '../../utils/firebaseTools';
// sagas
import formSaga from './reduxFormSaga';
// actions types
import * as actionTypes from '../../routes/AppAuth/modules/actionTypes';
// actions
import { sendEmailVerificationRequest } from '../../routes/AppAuth/modules/actions';
import { SubmissionError } from 'redux-form';


function * authApiWrapper(apiMethod, ...apiArgs) {
    const response = yield call(apiMethod, ...apiArgs);

    if (response.errorMessage) {
        throw new SubmissionError({ _error: response.errorMessage });
    }
    return response;
}

export function * logout() {
    try {
        const result = yield call(fbTools.logoutUser);

        return result;
    } catch (error) {
        yield put({ type: actionTypes.SET_ERROR_MESSAGE, error: error.message });
    }
}

function * sendEmailVerification() {
    const response = yield call(fbTools.sendEmailVerification);

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
    let response;

    // Because sagas are generators, doing `while (true)` doesn't block our program
    // Basically here we say "this saga is always listening for actions"
    while (true) {
        // And we're listening for `LOGIN_REQUEST` actions and destructuring its payload
        const authType = yield race({
            loginWithEmail   : take(actionTypes.LOGIN_REQUEST),
            loginWithProvider: take(actionTypes.LOGIN_WITH_PROVIDER_REQUEST),
            registration     : take(actionTypes.REGISTER_REQUEST)
        });

        if (authType.loginWithEmail) {
            response = yield call(
                formSaga, 'login', authApiWrapper, fbTools.loginUser, authType.loginWithEmail.data
            );
        } else if (authType.loginWithProvider) {
            const payload = authType.loginWithProvider.payload;

            response = yield call(
                formSaga, payload.form, authApiWrapper, fbTools.loginWithProvider, payload.provider
            );
        } else if (authType.registration) {
            response = yield call(
                formSaga, 'register', authApiWrapper, fbTools.registerUser, authType.registration.data
            );
        }

        if (response.success) {
            // check if verification need
            if (!response.result.emailVerified) {
                yield put(sendEmailVerificationRequest());
            }

            // if (userInfo.errorMessage) {
            //     yield put({ type: actionTypes.SET_ERROR_MESSAGE, error: userInfo.errorMessage });
            //     return false;
            // }

            // yield put({ type: actionTypes.SET_AUTH_INFO, payload: userInfo });

            yield put({ type: actionTypes.SET_AUTH, payload: true }); // User is logged in (authorized)

            forwardTo('/app'); // Go to dashboard page
        }

        // // A `LOGOUT` action may happen while the `authorize` effect is going on, which may
        // // lead to a race condition. This is unlikely, but just in case, we call `race` which
        // // returns the "winner", i.e. the one that finished first
        // const winner = yield race({
        //     auth  : call(formSaga, '', authorize, authType),
        //     logout: take(actionTypes.LOGOUT)
        // });

        // // If `authorize` was the winner...
        // if (winner.auth) {
        //     // ...we send Redux appropiate actions
        //     yield put({ type: actionTypes.SET_AUTH, payload: true }); // User is logged in (authorized)
        //     yield put({
        //         type        : actionTypes.CHANGE_FORM,
        //         newFormState: Map({ email: '', password: '', rememberMe: false })
        //     });

        //     forwardTo('/app'); // Go to dashboard page
        //     // If `logout` won...
        // } else if (winner.logout) {
        //     // ...we send Redux appropiate action
        //     yield put({ type: actionTypes.SET_AUTH, payload: false }); // User is not logged in (not authorized)
        //     yield call(logout); // Call `logout` effect
        //     forwardTo('/');
        // }
    }
}

/**
 * Log out saga
 * This is basically the same as the `if (winner.logout)` of above, just written
 * as a saga that is always listening to `LOGOUT` actions
 */
function * logoutFlow() {
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

function * verificationFlow() {
    yield takeLatest(actionTypes.REGISTER_VERIFICATION_REQUEST, sendEmailVerification);
}

// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
function * authSaga() {
    yield fork(loginFlow);
    yield fork(logoutFlow);
    yield fork(verificationFlow);
}

export default authSaga;

// Little helper function to abstract going to different pages
function forwardTo(location) {
    browserHistory.push(location);
}
