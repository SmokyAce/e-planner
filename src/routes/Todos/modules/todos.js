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
                t => entries[t].completed
            );
        case 'SHOW_ACTIVE':
            return todos.filter(
                t => !entries[t].completed
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
        const entries = { ...state.entries, [id]: todo(undefined, action) };
        const todoList = [...state.todoList, id];

        return {
            ...state,
            todoList,
            entries
        };
    },
    [TOGGLE_TODO]: (state, action) => {
        const entries = { ...state.entries, [action.id]: todo(state.entries[action.id], action) };

        return {
            ...state,
            entries
        };
    },
    [SET_VISIBILITY_FILTER]: (state, action) => {
        return {
            ...state,
            filter: action.filter
        };
    }
};

const initialState = { todoList: [], filter: 'SHOW_ALL', entries: {} };

export default function todosReduceer(state = initialState, action) {
    const handler = TODOS_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
