import Immutable from 'immutable';

// ------------------------------------
// Actions
// ------------------------------------

export const addTodo = (text, count) => {
    let newId = count;

    return {
        type: 'ADD_TASK',
        id  : newId++,
        text
    };
};

export const toggleTodo = id => {
    return {
        type: 'TOGGLE_TASK',
        id
    };
};

export const deleteTodo = id => {
    return {
        type: 'DELETE_TASK',
        id
    };
};

// ------------------------------------
// Constants
// ------------------------------------
const ADD_TASK    = 'ADD_TASK';
const TOGGLE_TASK = 'TOGGLE_TASK';
const DELETE_TASK = 'DELETE_TASK';
// ------------------------------------
// Reducers
// ------------------------------------

const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                id       : action.id,
                text     : action.text,
                completed: false
            };
        case 'TOGGLE_TASK':
            if (state.id !== action.id) {
                return state;
            }

            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
};

const TASKS_ACTION_HANDLERS = {
    [ADD_TASK]: (state, action) => {
        if (action.text === '') return state;

        const { id } = action;
        const newState = state.setIn(['entries', id], todo(undefined, action));

        return newState.updateIn(['tasksList'], list => list.push(id));
    },
    [TOGGLE_TASK]: (state, action) => {
        return state.setIn(['entries', action.id], todo(state.getIn(['entries', action.id]), action));
    },
    [DELETE_TASK]: (state, action) => {
        return state
            .set('tasksList', state.get('tasksList').filter(id => id !== action.id))
            .deleteIn(['entries', action.id]);
    }
};

const initialState = Immutable.fromJS({ tasksList: [], filter: 'SHOW_ALL', entries: {} });

export default function tasksReduceer(state = initialState, action) {
    const handler = TASKS_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
