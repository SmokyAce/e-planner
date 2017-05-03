import { fromJS } from 'immutable';
import * as actions from './actions';
import { LOGOUT } from '../auth/actions';
// The initial state of the App
const initialState = fromJS({
    currentUser: null
});

const USERS_ACTION_HANDLERS = {
    [actions.FETCH_USER_DATA_SUCCESS]: (state, action) => {
        return state
            .set('currentUser', fromJS(action.response));
    },
    [LOGOUT]: (state) => state.set('currentUser', fromJS(null))
};

export default function usersReducer(state = initialState, action) {
    const handler = USERS_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
