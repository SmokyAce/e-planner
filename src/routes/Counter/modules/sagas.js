import { put, takeEvery, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { COUNTER_DOUBLE_ASYNC_REQUEST, COUNTER_DOUBLE_ASYNC } from './counter';


function* doubleIncrement(action) {
    yield call(delay, 1000);

    const { eventId } = action.payload;

    yield put({ type: COUNTER_DOUBLE_ASYNC, payload: { eventId } });
}


/**
 * Watchers
 */
export function* watchDoubleIncrement() {
    yield takeEvery(COUNTER_DOUBLE_ASYNC_REQUEST, doubleIncrement);
}

export default [
    watchDoubleIncrement
];
