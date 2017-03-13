import Immutable from 'immutable';

// ------------------------------------
// Actions
// ------------------------------------

export const addTodo = (text, count) => {
    let newId = count;

    return {
        type: 'ADD_TODO',
        id  : newId++,
        text
    };
};

export const toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id
    };
};

export const deleteTodo = (id) => {
    return {
        type: 'DELETE_TODO',
        id
    };
};

export const setVisibilityFilter = (filter) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    };
};

export const getVisibleTodos = (todos, filter, entries) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(
                t => entries.get(t).completed
            );
        case 'SHOW_ACTIVE':
            return todos.filter(
                t => !entries.get(t).completed
            );
        default:
            return todos;
    }
};


// ------------------------------------
// Constants
// ------------------------------------
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const DELETE_TODO = 'DELETE_TODO';
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
// ------------------------------------
// Reducers
// ------------------------------------

const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id       : action.id,
                text     : action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
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

const TODOS_ACTION_HANDLERS = {

    [ADD_TODO]: (state, action) => {
        if (action.text === '') return state;

        const { id } = action;
        const newState = state.setIn(['entries', id], todo(undefined, action));

        return newState.updateIn(['todoList'], list => list.push(id));
    },
    [TOGGLE_TODO]: (state, action) => {
        return state.setIn(['entries', action.id], todo(state.getIn(['entries', action.id]), action));
    },
    [DELETE_TODO]: (state, action) => {
        return state
                .set('todoList', state.get('todoList')
                .filter(id => id !== action.id))
                .deleteIn(['entries', action.id]);
    },
    [SET_VISIBILITY_FILTER]: (state, action) => {
        return state.set('filter', action.filter);
    }
};

const initialState = Immutable.fromJS({ todoList: [], filter: 'SHOW_ALL', entries: {} });

export default function todosReduceer(state = initialState, action) {
    const handler = TODOS_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
