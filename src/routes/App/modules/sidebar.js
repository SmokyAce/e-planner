import { fromJS } from 'immutable';
import { REHYDRATE } from 'redux-persist/constants';

// ------------------------------------
// Constants
// ------------------------------------
export const SIDEBAR_OPEN_SET = 'SIDEBAR_OPEN_SET';
export const SIDEBAR_DOCKED_SET = 'SIDEBAR_DOCKED_SET';
export const SIDEBAR_PULL_RIGHT_SET = 'SIDEBAR_PULL_RIGHT_SET';
export const SIDEBAR_WIDTH_SET = 'SIDEBAR_WIDTH_SET';

// ------------------------------------
// Actions
// ------------------------------------
export const onSetOpen = open => ({
    type   : 'SIDEBAR_OPEN_SET',
    payload: open
});

export const onSetDocked = docked => ({
    type   : 'SIDEBAR_DOCKED_SET',
    payload: docked
});

export const onChangeSide = pullRight => ({
    type   : 'SIDEBAR_PULL_RIGHT_SET',
    payload: pullRight
});

export const onSetWidth = width => ({
    type   : 'SIDEBAR_WIDTH_SET',
    payload: width
});

// The initial state of the App
const initialState = fromJS({
    open     : false,
    docked   : false,
    pullRight: false,
    widht    : 256
});

const APP_ACTION_HANDLERS = {
    [SIDEBAR_OPEN_SET]: (state, action) => {
        return state.set('open', action.payload);
    },
    [SIDEBAR_DOCKED_SET]: (state, action) => {
        return state.set('docked', !action.payload);
    },
    [SIDEBAR_PULL_RIGHT_SET]: (state, action) => {
        return state.set('pullRight', action.payload);
    },
    [SIDEBAR_WIDTH_SET]: (state, action) => {
        return state.set('widht', action.payload);
    },
    [REHYDRATE]: (state, action) => {
        const incoming = action.payload.app;

        if (incoming && incoming.get('sidebar')) {
            return incoming.get('sidebar');
        }
        return state;
    }
};

export default function sidebarReducer(state = initialState, action) {
    const handler = APP_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
