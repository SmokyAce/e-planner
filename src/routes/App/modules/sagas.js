// This file contains the sagas used for async actions in our app. It's divided into
// "effects" that the sagas call (`authorize` and `logout`) and the actual sagas themselves,
// which listen for actions.
// Sagas help us gather all our side effects (network requests in this case) in one place
import { browserHistory } from 'react-router';
import { Map } from 'immutable';
import { channel } from 'redux-saga';
import { take, call, put, race } from 'redux-saga/effects';

import firebaseTools, { firebaseAuth } from '../../../utils/firebaseTools';
import api from './api';
import { omit } from 'lodash';
// import { normalize } from 'normalizr';
// import * as schema from './schema';

import {
    LOGIN_REQUEST,
    LOGIN_WITH_PROVIDER_REQUEST,
    REGISTER_REQUEST,
    REQUEST_ERROR,
    SET_AUTH,
    LOGOUT,
    CHANGE_FORM,
    SET_USER_INFO,
    UPDATE_USER_INFO_REQUEST,
    CHANGE_USER_PASSWORD_REQUEST
} from './auth';

import {
    FETCH_USER_DATA_REQUEST,
    FETCH_USER_DATA_SUCCESS,
    FETCH_USER_DATA_FAILURE,
    SET_USER_DATA_REQUEST,
    SET_USER_DATA_SUCCESS,
    SET_USER_DATA_FAILURE
} from './users';

import {
    APP_SYNC_REQUEST,
    APP_SYNC_SUCCESS,
    APP_SYNC_FAILURE,
    FIREBASE_DISCONNECTED,
    FIREBASE_CONNECTED
} from './status';

import { ADD_EVENT_REQUEST, ADD_EVENT_SUCCESS, ADD_EVENT_FAILURE } from './events';


/**
 * Log in saga
 */
export function* loginFlow() {
    // Because sagas are generators, doing `while (true)` doesn't block our program
    // Basically here we say "this saga is always listening for actions"
    while (true) {
        // And we're listening for `LOGIN_REQUEST` actions and destructuring its payload
        const authType = yield race({
            loginWithEmail   : take(LOGIN_REQUEST),
            loginWithProvider: take(LOGIN_WITH_PROVIDER_REQUEST)
        });

        // A `LOGOUT` action may happen while the `authorize` effect is going on, which may
        // lead to a race condition. This is unlikely, but just in case, we call `race` which
        // returns the "winner", i.e. the one that finished first
        const winner = yield race({
            auth  : call(authorize, authType),
            logout: take(LOGOUT)
        });


        // If `authorize` was the winner...
        if (winner.auth) {
            // ...we send Redux appropiate actions
            yield put({ type: SET_AUTH, newAuthState: true }); // User is logged in (authorized)
            yield put({ type: CHANGE_FORM, newFormState: Map({ email: '', password: '', rememberMe: false }) });
            forwardTo('/app'); // Go to dashboard page
            // If `logout` won...
        } else if (winner.logout) {
            // ...we send Redux appropiate action
            yield put({ type: SET_AUTH, newAuthState: false }); // User is not logged in (not authorized)
            yield call(logout); // Call `logout` effect
            forwardTo('/');
        }
    }
}

/**
 * Register saga
 * Very similar to log in saga!
 */
export function* registerFlow() {
    while (true) {
        // We always listen to `REGISTER_REQUEST` actions
        const request = yield take(REGISTER_REQUEST);
        // We call the `authorize` task with the data, telling it that we are registering a user
        // This returns `true` if the registering was successful, `false` if not
        const wasSuccessful = yield call(authorize, { registration: { data: request.data } });

        // If we could register a user, we send the appropiate actions
        if (wasSuccessful) {
            yield put({ type: SET_AUTH, newAuthState: true }); // User is logged in (authorized) after being registered
            yield put({ type: CHANGE_FORM, newFormState: Map({ email: '', password: '', rememberMe: false }) });
            forwardTo('/app'); // Go to home app page
        }
    }
}

/**
 * Effect to handle authorization
 * @param  {object} authType               The authType containes the result of race
 */
export function* authorize(authType) {
    // We then try to register or log in the user, depending on the request
    try {
        let userInfo;

        if (authType.loginWithEmail) {
            userInfo = yield call(firebaseTools.loginUser, authType.loginWithEmail.data);
        } else if (authType.loginWithProvider) {
            const result = yield firebaseTools.loginWithProvider(authType.loginWithProvider.provider);

            userInfo = (result.user) ? result.user : result;
        } else if (authType.registration) {
            userInfo = yield firebaseTools.registerUser(authType.registration.data);
        }

        if (userInfo.errorMessage) {
            yield put({ type: REQUEST_ERROR, error: userInfo.errorMessage });
            return false;
        }

        yield put({ type: SET_USER_INFO, userInfo });

        return true;
    } catch (error) {
        // If we get an error we send Redux the appropiate action and return
        yield put({ type: REQUEST_ERROR, error: error.message });

        return false;
    }
}

export function* logout() {
    try {
        const result = yield call(firebaseTools.logoutUser);

        return result;
    } catch (error) {
        yield put({ type: REQUEST_ERROR, error: error.message });
    }
}

/**
 * set user data to firebase
 */
export function* setUserData(userData) {
    let result;

    try {
        result = yield call(api.setUserData, userData);

        yield put({ type: SET_USER_DATA_SUCCESS, result });

        return true;
    } catch (error) {
        yield put({ type: SET_USER_DATA_FAILURE, error: error.message });
        return false;
    }
}

/**
 * update user data out saga
 * This is basically the same as the `if (winner.fetch)` of above, just written
 * as a saga that is always listening to `fetch` actions
 */
export function* updateUserInfoFlow() {
    while (true) {
        const updateType = yield race({
            updateUserProfile: take(UPDATE_USER_INFO_REQUEST),
            changePassword   : take(CHANGE_USER_PASSWORD_REQUEST)
        });

        let userInfo;

        try {
            if (updateType.updateUserProfile) {
                userInfo = yield call(firebaseTools.updateUserProfile, updateType.updateUserProfile.data);
            } else if (updateType.changePassword) {
                userInfo = yield call(firebaseTools.changePassword, updateType.changePassword.newPassword);
            }
        } catch (error) {
            // If we get an error we send Redux the appropiate action and return
            yield put({ type: REQUEST_ERROR, error: error.message });
            return false;
        }

        if (!userInfo.error) {
            yield put({ type: SET_USER_INFO, userInfo });
        } else {
            yield put({ type: REQUEST_ERROR, error: userInfo.errorMessage });
            return false;
        }
    }
}

// //////////////////////////////////////
// watchers
// //////////////////////////////////////

/**
 * fetch user data out saga
 * This is basically the same as the `if (winner.fetch)` of above, just written
 * as a saga that is always listening to `fetch` actions
 */
export function* fetchUserDataFlow() {
    while (true) {
        yield take(FETCH_USER_DATA_REQUEST);

        let response;

        try {
            response = yield call(api.fetchUserData);

            if (response === null) {  // take user data from firebase auth
                response = omit(firebaseAuth.currentUser.toJSON(),
                    ['appName', 'authDomain', 'redirectEventId', 'stsTokenManager']);
                response.isSync = false;
            } else {
                response.isSync = true;
            }

            yield put({ type: FETCH_USER_DATA_SUCCESS, response });

            if (!response.isSync) {
                yield put({ type: SET_USER_DATA_REQUEST, userData: response });
            }
        } catch (error) {
            yield put({ type: FETCH_USER_DATA_FAILURE, error: error.message });
            return false;
        }
    }
}

/**
 * Sync app data flow
 */
export function* syncDataFlow() {
    // Because sagas are generators, doing `while (true)` doesn't block our program
    // Basically here we say "this saga is always listening for actions"
    while (true) {
        let action = yield take(SET_USER_DATA_REQUEST);

        yield put({ type: APP_SYNC_REQUEST });

        let result;

        switch (action.type) {
            case SET_USER_DATA_REQUEST:
                result = yield call(setUserData, action.userData);
                break;
            default:
                result = true;
        }

        if (result) {
            yield put({ type: APP_SYNC_SUCCESS });
        } else {
            yield put({ type: APP_SYNC_FAILURE });
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
        yield take(LOGOUT);

        yield put({ type: SET_AUTH, newAuthState: false });

        const result = yield call(logout);

        if (result.success) {
            yield put({ type: SET_USER_INFO, userInfo: null });
            forwardTo('/');
        }
    }
}

const connectionStatusWrapper = (connStatusChannel) => ({
    connectionStatus(snapshot) {
        connStatusChannel.put(snapshot.val());
    }
});

/**
 * Connection to Firebase status
 * */
export function* connectionStatusChangeFlow() {
    const connectionStatusChannel = channel();
    const wrapper = connectionStatusWrapper(connectionStatusChannel);
    const connectionRef = firebaseTools.getDatabaseReference('.info/connected');

    connectionRef.on('value', wrapper.connectionStatus);

    while (true) {
        const result = yield take(connectionStatusChannel);

        if (result) {
            yield put({ type: FIREBASE_CONNECTED });
        } else {
            yield put({ type: FIREBASE_DISCONNECTED });
        }
    }
}

export function* eventsFlow() {
    while (true) {

        let action = yield take(ADD_EVENT_REQUEST);

        let response = yield call(api.addEvent, action.payload);
        console.log(response);
    }
}

fetchUserDataFlow.isDaemon          = true;
syncDataFlow.isDaemon               = true;
logoutFlow.isDaemon                 = true;
connectionStatusChangeFlow.isDaemon = true;
eventsFlow.isDaemon                 = true;

// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
export default [
    fetchUserDataFlow,
    syncDataFlow,
    logoutFlow,
    connectionStatusChangeFlow,
    eventsFlow
];

// Little helper function to abstract going to different pages
function forwardTo(location) {
    browserHistory.push(location);
}
