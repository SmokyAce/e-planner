import { fromJS } from 'immutable';

// ------------------------------------
// Actions
// ------------------------------------
export const changeLoading = (loading) => {
    return {
        type   : 'LOADING_CHANGE',
        payload: loading
    };
};

export const onSetOpen = (open) => {
    return {
        type   : 'SIDEBAR_OPEN_SET',
        payload: open
    };
};

export const onSetDocked = (docked) => {
    return {
        type   : 'SIDEBAR_DOCKED_SET',
        payload: docked
    };
};

// ------------------------------------
// Constants
// ------------------------------------
const LOADING_CHANGE = 'LOADING_CHANGE';
const SIDEBAR_OPEN_SET = 'SIDEBAR_OPEN_SET';
const SIDEBAR_DOCKED_SET = 'SIDEBAR_DOCKED_SET';


// ------------------------------------
// Reducers
// ------------------------------------

const CORE_ACTION_HANDLERS = {
    [LOADING_CHANGE]: (state, action) => {
        return state.set('loading', action.payload);
    },
    [SIDEBAR_OPEN_SET]: (state, action) => {
        return state.setIn(['sidebar', 'sidebarOpen'], action.payload);
    },
    [SIDEBAR_DOCKED_SET]: (state, action) => {
        return state.setIn(['sidebar', 'sidebarDocked'], !action.payload);
    }
};

const initialState = fromJS({
    sidebar: { sidebarOpen: false, sidebarDocked: false },
    loading: false
});

export default function coreReducer(state = initialState, action) {
    const handler = CORE_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
