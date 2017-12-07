import { take, call, put, race, fork } from 'redux-saga/effects';
// API
import api from './api';
// actions
import * as taskActions from './tasks';

function * addTask(action) {
    yield put(taskActions.addTaskRequest());

    const response = yield call(api.addTask, action.payload);

    if (!response.error) {
        yield put(taskActions.addTaskSuccess(response.payload));
    } else {
        yield put(taskActions.addTaskFailure(response.payload, response.error));
    }
}

function * removeTask(action) {
    yield put(taskActions.removeTaskRequest());

    const response = yield call(api.removeTask, action.payload);

    if (!response.error) {
        yield put(taskActions.removeTaskSuccess(response.payload));
    } else {
        yield put(taskActions.removeTaskFailure(response.payload, response.error));
    }
}

function * toggleTask(action) {
    yield put(taskActions.toggleTaskRequest());

    const response = yield call(api.toggleTask, action.payload);

    if (!response.error) {
        yield put(taskActions.toggleTaskSuccess(response.payload));
    } else {
        yield put(taskActions.toggleTaskFailure(response.payload, response.error));
    }
}

export function * taskFlow() {
    while (true) {
        const winner = yield race({
            addTask   : take(taskActions.types.ADD_TASK),
            removeTask: take(taskActions.types.REMOVE_TASK),
            toggleTask: take(taskActions.types.TOGGLE_TASK)
        });

        if (winner.addTask) {
            yield fork(addTask, winner.addTask);
        } else if (winner.removeTask) {
            yield fork(removeTask, winner.removeTask);
        } else if (winner.toggleTask) {
            yield fork(toggleTask, winner.toggleTask);
        }
    }
}

// daemon watchers
taskFlow.isDaemon = true;

// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
export default [taskFlow];
