import { put, take, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { COUNTER_DOUBLE_ASYNC_REQUEST, COUNTER_DOUBLE_ASYNC } from './counter';


/**
 * Watchers
 */
export function* doubleIncrement() {
    while (true) {
        const result = yield take(COUNTER_DOUBLE_ASYNC_REQUEST);

        yield call(delay, 1000);

        const { eventId, value } = result.payload;

        yield put({ type: COUNTER_DOUBLE_ASYNC, payload: { eventId, value } });
    }
}

export default [
    doubleIncrement
];
