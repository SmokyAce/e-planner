import { fromJS } from 'immutable';
import { pick } from 'lodash';
import { firebaseDb } from '../../../utils/firebaseTools';
import { REHYDRATE } from 'redux-persist/constants';

// ------------------------------------
// Constants
// ------------------------------------
const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

const ADD_TASK = 'ADD_TASK';
const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST';
const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';

const TOGGLE_TASK = 'TOGGLE_TASK';
const TOGGLE_TASK_REQUEST = 'TOGGLE_TASK_REQUEST';
const TOGGLE_TASK_SUCCESS = 'TOGGLE_TASK_SUCCESS';
const TOGGLE_TASK_FAILURE = 'TOGGLE_TASK_FAILURE';

const REMOVE_TASK = 'REMOVE_TASK';
const REMOVE_TASK_REQUEST = 'REMOVE_TASK_REQUEST';
const REMOVE_TASK_SUCCESS = 'REMOVE_TASK_SUCCESS';
const REMOVE_TASK_FAILURE = 'REMOVE_TASK_FAILURE';

export const types = {
    ADD_TASK,
    REMOVE_TASK,
    TOGGLE_TASK
};

// ------------------------------------
// Actions
// ------------------------------------

export const addTask = (values, eventId) => {
    const task = pick(values.toJS(), ['description', 'date']);

    task.id = firebaseDb
        .ref()
        .child('tasks')
        .push().key;

    task.eventId = eventId;
    task.done = false;

    return {
        type   : ADD_TASK,
        payload: task
    };
};

export const addTaskRequest = () => ({
    type: ADD_TASK_REQUEST
});
export const addTaskSuccess = taskId => ({
    type   : ADD_TASK_SUCCESS,
    payload: taskId
});

export const addTaskFailure = (taskId, error) => ({
    type   : ADD_TASK_FAILURE,
    payload: taskId,
    error
});

export const removeTask = (id, eventId) => ({
    type   : REMOVE_TASK,
    payload: { id, eventId }
});

export const removeTaskRequest = () => ({
    type: REMOVE_TASK_REQUEST
});
export const removeTaskSuccess = taskId => ({
    type   : REMOVE_TASK_SUCCESS,
    payload: taskId
});

export const removeTaskFailure = (taskId, error) => ({
    type   : REMOVE_TASK_FAILURE,
    payload: taskId,
    error
});

export const fetchTasksRequest = () => ({
    type: FETCH_TASKS_REQUEST
});

export const fetchTasksSuccess = response => ({
    type   : FETCH_TASKS_SUCCESS,
    payload: response
});

export const fetchTasksFailure = error => ({
    type: FETCH_TASKS_FAILURE,
    error
});

export const toggleTask = (id, completed) => ({
    type   : TOGGLE_TASK,
    payload: { id, completed }
});

export const toggleTaskRequest = () => ({
    type: TOGGLE_TASK_REQUEST
});

export const toggleTaskSuccess = response => ({
    type   : TOGGLE_TASK_SUCCESS,
    payload: response
});

export const toggleTaskFailure = error => ({
    type: TOGGLE_TASK_FAILURE,
    error
});

// ------------------------------------
// Reducers
// ------------------------------------
const TASKS_ACTION_HANDLERS = {
    [ADD_TASK]: (state, action) => {
        const { payload } = action;

        return state
            .setIn(['entries', payload.id], fromJS(payload))
            .updateIn(['listOfIds'], list => list.push(payload.id));
    },
    [TOGGLE_TASK]: (state, action) => {
        return state.setIn(['entries', action.payload.id, 'completed'], !action.payload.completed);
    },
    [REMOVE_TASK]: (state, action) => {
        return state
            .set('listOfIds', state.get('listOfIds').filter(id => id !== action.id))
            .deleteIn(['entries', action.id]);
    },
    [FETCH_TASKS_SUCCESS]: (state, action) => {
        return state.set('listOfIds', fromJS(action.payload.result)).set('entries', fromJS(action.payload.response));
    },
    [REHYDRATE]: (state, action) => {
        const incoming = action.payload.app;

        if (incoming && incoming.get('tasks')) {
            return incoming.get('tasks');
        }
        return state;
    }
};

const initialState = fromJS({ listOfIds: [], entries: {}, filter: 'SHOW_ALL' });

export default function tasksReduceer(state = initialState, action) {
    const handler = TASKS_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
