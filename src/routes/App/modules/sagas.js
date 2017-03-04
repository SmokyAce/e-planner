import { delay } from 'redux-saga'
import { put, call, takeLatest } from 'redux-saga/effects';
import { FETCH_FIREBASE_USER, REQUEST_FIREBASE_USER } from './user';
import FireBaseTools from '../../../utils/firebase';


export function* helloSaga() {
    console.log('Hello Sagas!')
}

// Our worker Saga: will perform the async increment task
export function* fetchUser() {
    const request = yield FireBaseTools.fetchUser();
    yield put({ type: FETCH_FIREBASE_USER, payload: request })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchFetchUser() {
    yield takeLatest(REQUEST_FIREBASE_USER, fetchUser)
}

// single entry point to start all Sagas at once
export default [
    helloSaga,
    watchFetchUser
]