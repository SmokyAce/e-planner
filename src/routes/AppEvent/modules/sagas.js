import { take, call, put, race, fork } from 'redux-saga/effects';
// API
import api from './api';
// actions
import * as taskActions from './tasks';


function * addTask(action) {
    yield put(taskActions.addTaskRequest());

    const response = yield call(api.addTask, action.payload);

    if (!response.error) {
        yield put(taskActions.addTaskSuccess(response.id));
    } else {
        yield put(taskActions.addTaskFailure(response.id, response.error));
    }
}

function * removeTask(action) {
    yield put(taskActions.removeTaskRequest());

    const response = yield call(api.removeEvent, action.payload);

    if (!response.error) {
        yield put(taskActions.removeTaskSuccess(response.id));
    } else {
        yield put(taskActions.removeTaskFailure(response.id, response.error));
    }
}

export function * taskFlow() {
    while (true) {
        const winner = yield race({
            addTask   : take(taskActions.types.ADD_TASK),
            removeTask: take(taskActions.types.REMOVE_TASK)
        });

        if (winner.addTask) {
            yield fork(addTask, winner.addTask);
        } else if (winner.removeTask) {
            yield fork(removeTask, winner.removeTask);
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
