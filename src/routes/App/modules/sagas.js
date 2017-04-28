// This file contains the sagas used for async actions in our app. It's divided into
// "effects" that the sagas call (`authorize` and `logout`) and the actual sagas themselves,
// which listen for actions.
// Sagas help us gather all our side effects (network requests in this case) in one place
import { channel, delay } from 'redux-saga';
import { take, call, put, race, select } from 'redux-saga/effects';

import { logoutFlow } from '../../AppAuth/modules/sagas';

import firebaseTools, { firebaseAuth } from '../../../utils/firebaseTools';
import api from './api';
import { omit } from 'lodash';

import { makeSelectLoggedIn } from './selectors';
import * as authActions from './auth/actions';
import * as eventActions from './events/actions';
import * as userActions from './users/actions';

import {
    APP_SYNC_REQUEST,
    APP_SYNC_SUCCESS,
    APP_SYNC_FAILURE,
    FIREBASE_CONNECTED
} from './status';


export function* logout() {
    try {
        const result = yield call(firebaseTools.logoutUser);

        return result;
    } catch (error) {
        yield put({ type: authActions.SET_ERROR_MESSAGE, error: error.message });
    }
}

/**
 * set user data to firebase
 */
export function* setUserData(userData) {
    let result;

    try {
        result = yield call(api.setUserData, userData);

        yield put({ type: userActions.SET_USER_DATA_SUCCESS, result });

        return true;
    } catch (error) {
        yield put({ type: userActions.SET_USER_DATA_FAILURE, error: error.message });
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
            updateUserProfile: take(authActions.UPDATE_USER_INFO_REQUEST),
            changePassword   : take(authActions.CHANGE_USER_PASSWORD_REQUEST)
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
            yield put({ type: authActions.SET_ERROR_MESSAGE, error: error.message });
            return false;
        }

        if (!userInfo.error) {
            yield put({ type: authActions.SET_USER_INFO, userInfo });
        } else {
            yield put({ type: authActions.SET_ERROR_MESSAGE, error: userInfo.errorMessage });
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
        yield take(userActions.FETCH_USER_DATA_REQUEST);

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

            yield put({ type: userActions.FETCH_USER_DATA_SUCCESS, response });

            if (!response.isSync) {
                yield put({ type: userActions.SET_USER_DATA_REQUEST, userData: response });
            }
        } catch (error) {
            yield put({ type: userActions.FETCH_USER_DATA_FAILURE, error: error.message });
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
        const action = yield take(userActions.SET_USER_DATA_REQUEST);

        yield put({ type: APP_SYNC_REQUEST });

        let result;

        switch (action.type) {
            case userActions.SET_USER_DATA_REQUEST:
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


const connectionStatusWrapper = (connStatusChannel) => ({
    connectionStatus(snapshot) {
        connStatusChannel.put(snapshot.val());
    }
});

const authWrapper = (authStateChannel) => ({
    onChange(user) {
        authStateChannel.put(user !== null);
    }
});

/**
 * Firebase Connection status observer
 * */
export function* connectionObserver() {
    yield delay(2000);

    const connectionStatusChannel = channel();
    const wrapper = connectionStatusWrapper(connectionStatusChannel);
    const connectionRef = firebaseTools.getDatabaseReference('.info/connected');

    connectionRef.on('value', wrapper.connectionStatus);

    while (true) {
        const result = yield take(connectionStatusChannel);

        yield put({ type: FIREBASE_CONNECTED, payload: result });
    }
}

/**
 * Firebase Authentification status observer
 * */
export function* authObserver() {
    yield delay(2000);

    const authStateChannel = channel();
    const wrapper = authWrapper(authStateChannel);

    firebaseAuth.onAuthStateChanged(wrapper.onChange);

    while (true) {
        const loggedIn = yield take(authStateChannel);

        // get cuure
        const loggedIn_ = yield select(makeSelectLoggedIn());

        if (loggedIn !== loggedIn_) {
            yield put({ type: authActions.SET_AUTH, payload: loggedIn });
        }
        if (!loggedIn) {
            yield put({ type: authActions.LOGOUT });
        }
    }
}

export function* addEventsFlow() {
    while (true) {
        const action = yield take(eventActions.ADD_EVENT_REQUEST);

        const response = yield call(api.addEvent, action.payload);

        if (!response.error) {
            yield put({ type: eventActions.ADD_EVENT_SUCCESS, payload: response });
            yield put({ type: userActions.FETCH_USER_DATA_REQUEST });
        } else {
            yield put({ type: eventActions.ADD_EVENT_FAILURE, error: response.error });
        }
    }
}

export function* fetchEventsFlow() {
    while (true) {
        yield take(eventActions.FETCH_EVENT_REQUEST);

        const response = yield call(api.fetchEvents);

        if (!response.error) {
            yield put({ type: eventActions.FETCH_EVENT_SUCCESS, payload: response });
        } else {
            yield put({ type: eventActions.FETCH_EVENT_FAILURE, error: response.error });
        }
    }
}

fetchUserDataFlow.isDaemon = true;
syncDataFlow.isDaemon = true;
addEventsFlow.isDaemon = true;
fetchEventsFlow.isDaemon = true;
logoutFlow.isDaemon = true;

authObserver.isDaemon = true;
connectionObserver.isDaemon = true;

// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
export default [
    fetchUserDataFlow,
    syncDataFlow,
    addEventsFlow,
    fetchEventsFlow,
    logoutFlow,
    // Firebase observers
    connectionObserver,
    authObserver
];
