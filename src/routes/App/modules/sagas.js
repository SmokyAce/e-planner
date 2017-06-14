// utils
import { channel, delay } from 'redux-saga';
import { take, call, put, race, select, fork } from 'redux-saga/effects';
import { omit, keys, isEqual } from 'lodash';
// auth sagas
import { logoutFlow, logout } from '../../AppAuth/modules/sagas';
// API
import api from './api';
import firebaseTools, { firebaseAuth } from '../../../utils/firebaseTools';
// selectors
import { makeSelectLoggedIn } from '../../AppAuth/modules/selectors';
import { makeSelectEventsListOfIds } from '../../App/modules/selectors';
// actions
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import * as authActionTypes from '../../AppAuth/modules/actionTypes';
import * as eventActions from './events/actions';
import * as userActions from './users/actions';
import { actions as statusActions } from './status';


function * addEvent(action) {
    yield put({ type: eventActions.ADD_EVENT_REQUEST });

    const response = yield call(api.addEvent, action.payload);

    if (!response.error) {
        yield put({ type: eventActions.ADD_EVENT_SUCCESS, payload: response.id });
    } else {
        yield put({ type: eventActions.ADD_EVENT_FAILURE, payload: response.id, error: response.error });
    }
}

/**
 * set user data to firebase
 */
export function * setUserData(userData) {
    let result;

    try {
        result = yield call(api.setUserData, userData);

        yield put({ type: userActions.SAVE_USER_DATA_SUCCESS, result });

        return true;
    } catch (error) {
        yield put({ type: userActions.SAVE_USER_DATA_FAILURE, error: error.message });
        return false;
    }
}

/**
 * update user data out saga
 * This is basically the same as the `if (winner.fetch)` of above, just written
 * as a saga that is always listening to `fetch` actions
 */
export function * updateUserInfoFlow() {
    while (true) {
        const updateType = yield race({
            updateUserProfile: take(authActionTypes.UPDATE_USER_INFO_REQUEST),
            changePassword   : take(authActionTypes.CHANGE_USER_PASSWORD_REQUEST)
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
            yield put({ type: authActionTypes.SET_ERROR_MESSAGE, error: error.message });
            return false;
        }

        if (!userInfo.error) {
            yield put({ type: authActionTypes.SET_AUTH_INFO, payload: userInfo });
        } else {
            yield put({ type: authActionTypes.SET_ERROR_MESSAGE, error: userInfo.errorMessage });
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
export function * fetchUserDataFlow() {
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

            yield put({ type: userActions.FETCH_USER_DATA_SUCCESS, payload: response });
            yield fork(fetchEvents);

            if (!response.isSync) {
                yield put({ type: userActions.SAVE_USER_DATA_REQUEST, userData: response });
            }
        } catch (error) {
            yield put({ type: userActions.FETCH_USER_DATA_FAILURE, error: error.message });
            return false;
        }
    }
}

/**
 * Fetch user data from DB
 */
export function * fetchUserData() {
    yield put({ type: userActions.FETCH_USER_DATA_REQUEST });

    const { response, error } = yield call(api.fetchUserData);

    if (response) {
        yield put({ type: userActions.FETCH_USER_DATA_SUCCESS, payload: response });
    } else {
        yield put({ type: userActions.FETCH_USER_DATA_FAILURE, error });
    }
    return response;
}


/**
 * Each action what consist 'REQUEST' start:
 * - sync process
 * - show loader
 * After 'SUCCESS' action this processes will be end
 */
export function * syncDataFlow() {
    while (true) {
        yield take(action => action.type.indexOf('REQUEST') > 0);

        yield put(showLoading());
        yield put(statusActions.changeAppSyncStatus(false));

        const result = yield race({
            success: take(action => action.type.indexOf('SUCCESS') > 0),
            failure: take(action => action.type.indexOf('FAILURE') > 0)
        });

        if (result.success) {
            yield put(statusActions.changeAppSyncStatus(true));
        } else {
            yield put(statusActions.changeAppSyncStatus(result.failure.error));
        }

        yield put(hideLoading());
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
export function * connectionObserver() {
    yield delay(2000);

    // console.log('Connection status observer was create!');
    const connectionStatusChannel = channel();
    const wrapper = connectionStatusWrapper(connectionStatusChannel);
    const connectionRef = firebaseTools.getDatabaseReference('.info/connected');

    connectionRef.on('value', wrapper.connectionStatus);

    while (true) {
        const result = yield take(connectionStatusChannel);

        yield put(statusActions.changeFirebaseConnectionStatus(result));
    }
}

/**
 * Firebase Authentification status observer
 * */
export function * authObserver() {
    yield delay(2000);

    // console.log('Connection status observer was create!');
    const authStateChannel = channel();
    const wrapper = authWrapper(authStateChannel);

    firebaseAuth.onAuthStateChanged(wrapper.onChange);

    while (true) {
        const loggedIn = yield take(authStateChannel);

        // get current state
        const loggedIn_ = yield select(makeSelectLoggedIn());

        if (loggedIn !== loggedIn_) {
            yield put({ type: authActionTypes.SET_AUTH, payload: loggedIn });
        }
        if (!loggedIn && loggedIn_) {
            yield fork(logout);
        }
    }
}

export function * addEventsFlow() {
    while (true) {
        const action = yield take(eventActions.ADD_EVENT);

        yield fork(addEvent, action);
    }
}

export function * fetchEvents() {
    const response = yield call(api.fetchEvents);

    if (!response.error) {
        yield put({ type: eventActions.FETCH_EVENT_SUCCESS, payload: response });
    } else {
        yield put({ type: eventActions.FETCH_EVENT_FAILURE, error: response.error });
    }
}

export function * fetchEventsFlow() {
    while (true) {
        yield take(eventActions.FETCH_EVENT_REQUEST);

        yield fork(fetchEvents);
    }
}

export function * initializationFlow() {
    yield put(statusActions.changeAppInitializationStatus('start'));

    const userData = yield call(fetchUserData);

    // Take list of events ids from redux store and compare with events from user data
    // if are not equals make fetch events from DB
    const listOfEventsIds = yield select(makeSelectEventsListOfIds());

    if (!isEqual(keys(userData.events).sort(), listOfEventsIds.toJS().sort())) {
        yield fork(fetchEvents);
    }

    yield put(statusActions.changeAppInitializationStatus('end'));
}

initializationFlow.isDaemon = true;
syncDataFlow.isDaemon = true;
addEventsFlow.isDaemon = true;
fetchEventsFlow.isDaemon = true;
logoutFlow.isDaemon = true;
// daemon observers
authObserver.isDaemon = true;
connectionObserver.isDaemon = true;

// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
export default [
    syncDataFlow,
    addEventsFlow,
    fetchEventsFlow,
    logoutFlow,
    // Firebase observers
    connectionObserver,
    authObserver,
    // App initialization flow
    initializationFlow
];
