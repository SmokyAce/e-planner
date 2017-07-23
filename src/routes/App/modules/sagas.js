// utils
import { channel, delay } from 'redux-saga';
import { take, call, put, race, select, fork } from 'redux-saga/effects';
import { omit, keys, isEqual } from 'lodash';
// auth sagas
import { logout } from '../../../store/authSaga';
// API
import api from './api';
import firebaseTools, { firebaseAuth } from '../../../utils/firebaseTools';
// selectors
import { makeSelectLoggedIn } from '../../AppAuth/modules/selectors';
import { makeSelectEventsListOfIds, makeSelectAppRestoreState } from '../../App/modules/selectors';
// actions
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { REHYDRATE } from 'redux-persist/constants';
import * as authActionTypes from '../../AppAuth/modules/actionTypes';
import * as eventActions from './events';
import * as userActions from './user';
import * as syncActions from './sync';
import * as connectionActions from './connection';


// /////////////////////
// Events
// /////////////////////
function * addEvent(action) {
    yield put({ type: eventActions.addEventRequest });

    const response = yield call(api.addEvent, action.payload);

    if (!response.error) {
        yield put(eventActions.addEventSuccess(response.id));
    } else {
        yield put(eventActions.addEventFailure(response.id, response.error));
    }
}


export function * fetchEvents() {
    const { response, error } = yield call(api.fetchEvents);

    if (response) {
        yield put(eventActions.fetchEventSuccess(response));
    } else {
        yield put(eventActions.fetchEventFailure(error));
    }
}


// /////////////////////
// User
// /////////////////////
/**
 * set user data to firebase
 */
export function * setUserData(userData) {
    const { success, error } = yield call(api.setUserData, userData);

    if (success) {
        yield put(userActions.saveUserDataAction('success'));
    } else {
        yield put(userActions.saveUserDataAction('failure', error));
    }
    return success;
}


/**
 * Fetch user data from DB
 */
export function * fetchUserData() {
    yield put({ type: userActions.type.FETCH_USER_DATA_REQUEST });

    const { response, error } = yield call(api.fetchUserData);

    if (response) {
        yield put(userActions.fetchUserDataSuccess(response));
        return response;
    }
    yield put(userActions.fetchUserDataFailure(error));
    throw new Error(error);
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


// /////////////////////
// Sync
// /////////////////////
export function * appSyncFlow() {
    try {
        yield call(delay, 100);

        yield fork(fetchUserData);

        const fetchAction = yield take(userActions.type.FETCH_USER_DATA_SUCCESS);

        // Take list of events ids from redux store and compare with events from user data
        // if are not equals make fetch events from DB
        const listOfEventsIds = yield select(makeSelectEventsListOfIds());

        if (!isEqual(keys(fetchAction.payload.events).sort(), listOfEventsIds.toJS().sort())) {
            yield put(eventActions.fetchEventRequest());

            yield call(fetchEvents);
        }

        yield put(syncActions.finishSync());
    } catch (error) {
        yield put(syncActions.errorSync(error));
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
        yield take(userActions.type.FETCH_USER_DATA_REQUEST);

        let response;

        try {
            response = yield call(api.fetchUserData);

            if (response === null) { // take user data from firebase auth
                response = omit(firebaseAuth.currentUser.toJSON(),
                    ['appName', 'authDomain', 'redirectEventId', 'stsTokenManager']);
                response.isSync = false;
            } else {
                response.isSync = true;
            }

            yield put(userActions.fetchUserDataSuccess(response));
            yield fork(fetchEvents);

            if (!response.isSync) {
                yield put(userActions.saveUserData(response));
            }
        } catch (error) {
            yield put(userActions.fetchUserDataFailure(error));
            return false;
        }
    }
}

/**
 * For each action, what has 'REQUEST':
 * - show loader
 * After 'SUCCESS' action will:
 * - hide loader
 */
export function * loadingFlow() {
    while (true) {
        yield take(action => action.type.indexOf('REQUEST') > 0);

        yield put(showLoading());

        yield race({
            success: take(action => action.type.indexOf('SUCCESS') > 0),
            failure: take(action => action.type.indexOf('FAILURE') > 0),
            delay  : call(delay, 3000)
        });

        yield put(hideLoading());
    }
}

/**
 * watch for start sync action
 */
export function * watchSync() {
    while (true) {
        yield take(syncActions.types.APP_START_SYNC);

        const appRestored = yield select(makeSelectAppRestoreState());

        if (!appRestored) {
            yield take(REHYDRATE);
        }

        yield fork(appSyncFlow);
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

        yield put(connectionActions.changeFirebaseConnectionStatus(result ? 'Online' : 'Offline'));
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
        const action = yield take(eventActions.types.ADD_EVENT);

        yield fork(addEvent, action);
    }
}


// daemon watchers
watchSync.isDaemon = true;
loadingFlow.isDaemon = true;
addEventsFlow.isDaemon = true;
// daemon observers
authObserver.isDaemon = true;
connectionObserver.isDaemon = true;

// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
export default [
    watchSync,
    loadingFlow,
    addEventsFlow,
    // Firebase observers
    connectionObserver,
    authObserver
];
