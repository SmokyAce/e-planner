// utils
import { channel, delay } from 'redux-saga';
import { take, call, put, race, select, fork } from 'redux-saga/effects';
import { pick, keys, isEqual } from 'lodash';
// auth sagas
import { logout } from '../../../store/middlewares/authSaga';
// API
import api from './api';
import firebaseTools, { firebaseAuth } from '../../../utils/firebaseTools';
// selectors
import { makeSelectLoggedIn } from '../../AppAuth/modules/selectors';
import { makeSelectEventsListOfIds, selectRestored } from '../../App/modules/selectors';
// actions
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { REHYDRATE } from 'redux-persist/constants';
import * as authActionTypes from '../../AppAuth/modules/actionTypes';
import * as eventActions from './events';
import * as userActions from './user';
import * as syncActions from './sync';
import * as connectionActions from './connection';
// import * as taskActions from '../../AppEvent/modules/tasks';

// /////////////////////
// Events
// /////////////////////
function * addEvent(action) {
    yield put(eventActions.addEventRequest());

    const response = yield call(api.addEvent, action.payload);

    if (!response.error) {
        yield put(eventActions.addEventSuccess(response.id));
    } else {
        yield put(eventActions.addEventFailure(response.id, response.error));
    }
}

function * removeEvent(action) {
    yield put(eventActions.removeEventRequest());

    const response = yield call(api.removeEvent, action.payload);

    if (!response.error) {
        yield put(eventActions.removeEventSuccess(response.id));
    } else {
        yield put(eventActions.removeEventFailure(response.id, response.error));
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
    let userInfo;

    yield put({ type: userActions.type.FETCH_USER_DATA_REQUEST });

    const { response, error } = yield call(api.fetchUserData);

    if (error) {
        yield put(userActions.fetchUserDataFailure(error));
        throw new Error(error);
    }

    if (response === null) {
        console.log('setUserData', response);
        userInfo = pick(firebaseAuth.currentUser.toJSON(), [
            'uid',
            'email',
            'displayName',
            'providerData',
            'isAnonymous',
            'emailVerified'
        ]);

        yield setUserData(userInfo);
    } else {
        userInfo = response;
    }
    yield put(userActions.fetchUserDataSuccess(userInfo));
    return userInfo;
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
        yield fork(fetchUserData);

        const fetchAction = yield take(userActions.type.FETCH_USER_DATA_SUCCESS);
        // Take list of events ids from redux store and compare with events from user data
        // if are not equals make fetch events from DB
        const listOfEventsIds = yield select(makeSelectEventsListOfIds());

        if (!isEqual(keys(fetchAction.payload.events).sort(), listOfEventsIds.toJS().sort())) {
            yield put(eventActions.fetchEventRequest());

            yield call(fetchEvents);
        }

        // yield call(fetchTasks);

        yield put(syncActions.finishSync());
    } catch (error) {
        yield put(syncActions.errorSync(error));
    }
}

// //////////////////////////////////////
// watchers
// //////////////////////////////////////

/**
 * "Show loader" for each action, what has 'REQUEST':
 * and "hide loader" after 'SUCCESS' action
 */
export function * loadingFlow() {
    while (true) {
        yield take(action => {
            return action.type.indexOf('REQUEST') > 0;
        });

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
        yield take([syncActions.types.APP_START_SYNC]);

        yield call(delay, 1000);

        const appRestored = yield select(selectRestored);

        if (!appRestored) {
            yield take(REHYDRATE);
        }

        yield fork(appSyncFlow);
    }
}

const connectionStatusWrapper = connStatusChannel => ({
    connectionStatus(snapshot) {
        connStatusChannel.put(snapshot.val());
    }
});

const authWrapper = authStateChannel => ({
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

export function * eventsFlow() {
    while (true) {
        const winner = yield race({
            addEvent   : take(eventActions.types.ADD_EVENT),
            removeEvent: take(eventActions.types.REMOVE_EVENT)
        });

        if (winner.addEvent) {
            yield fork(addEvent, winner.addEvent);
        } else if (winner.removeEvent) {
            yield fork(removeEvent, winner.removeEvent);
        }
    }
}

// daemon watchers
watchSync.isDaemon = true;
loadingFlow.isDaemon = true;
eventsFlow.isDaemon = true;
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
    eventsFlow,
    // Firebase observers
    connectionObserver,
    authObserver
];
