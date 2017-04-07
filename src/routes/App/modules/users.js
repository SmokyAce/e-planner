import { fromJS } from 'immutable';


// ------------------------------------
// Constants
// ------------------------------------
export const SET_USER_INFO                = 'SET_USER_INFO';


// ------------------------------------
// Actions
// ------------------------------------

// The initial state of the App
const initialState = fromJS({
    currentUser: null
});

const USERS_ACTION_HANDLERS = {
    [SET_USER_INFO]: (state, action) => {
        return state
            .set('currentUser', action.userInfo);
    }
};

export default function usersReducer(state = initialState, action) {
    const handler = USERS_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
