import Immutable from 'immutable';

// ------------------------------------
// Actions
// ------------------------------------
export const onSetOpen = (open) => {
    return {
        type   : 'SIDEBAR_OPEN_SET',
        payload: open
    };
};

export const onSetDocked = (docked) => {
    return {
        type   : 'SIDEBAR_DOCKED_SET',
        payload: !docked
    };
};

// ------------------------------------
// Constants
// ------------------------------------
const SIDEBAR_OPEN_SET = 'SIDEBAR_OPEN_SET';
const SIDEBAR_DOCKED_SET = 'SIDEBAR_DOCKED_SET';


// ------------------------------------
// Reducers
// ------------------------------------

const PLANNER_ACTION_HANDLERS = {

    [SIDEBAR_OPEN_SET]: (state, action) => {
        return state.setIn(['sidebarOpen'], action.payload);
    },
    [SIDEBAR_DOCKED_SET]: (state, action) => {
        return state.setIn(['sidebarDocked'], action.payload);
    }

};

const initialState = Immutable.fromJS({ sidebarOpen: false, sidebarDocked: false });

export default function plannerReducer(state = initialState, action) {
    const handler = PLANNER_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
