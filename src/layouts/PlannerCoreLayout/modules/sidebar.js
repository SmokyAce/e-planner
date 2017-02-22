import Immutable from 'immutable';

// ------------------------------------
// Actions
// ------------------------------------
export const onSetOpen = (open) => {
    return {
        type   : 'SIDEBAR_SET',
        payload: open
    };
};

// ------------------------------------
// Constants
// ------------------------------------
const SIDEBAR_SET = 'SIDEBAR_SET';


// ------------------------------------
// Reducers
// ------------------------------------

const PLANNER_ACTION_HANDLERS = {

    [SIDEBAR_SET]: (state, action) => {
        return state.setIn(['sidebarOpen'], action.payload);
    }

};

const initialState = Immutable.fromJS({ sidebarOpen: false, sidebarDocked: false });

export default function plannerReducer(state = initialState, action) {
    const handler = PLANNER_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
