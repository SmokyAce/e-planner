import { loginFlow } from '../../App/modules/sagas';
import { take, put, fork, cancel } from 'redux-saga/effects';

import { SET_ERROR_MESSAGE } from '../../App/modules/auth/actions';
import { LOCATION_CHANGE } from '../../../store/reducers/location';

/**
 * Watchers
 */
export function* watchLoginFlow() {
    // Fork watcher so we can continue execution
    const watcher = yield fork(loginFlow);

    // Suspend execution until location changes
    const data = yield take(LOCATION_CHANGE);

    if (data.payload.action !== 'POP') {
        yield put({ type: SET_ERROR_MESSAGE, message: '' });
        yield cancel(watcher);
    }
}

// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
export default [
    watchLoginFlow
];