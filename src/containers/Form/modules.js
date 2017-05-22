import { fromJS } from 'immutable';


// ------------------------------------
// Constants
// ------------------------------------
export const CHANGE_FORM = 'CHANGE_FORM';

// ------------------------------------
// Actions
// ------------------------------------

/**
 * Sets the form state
 * @param  {string} name (email, password or ...) The name of input that user change
 * @param  {string} value The value of input that user change
 */
export const changeForm = (name, value) => ({
    type: CHANGE_FORM,
    name,
    value
});


const FORM_ACTION_HANDLERS = {
    [CHANGE_FORM]: (state, action) => {
        return state
            .setIn(['formState', action.name], action.value);
    }
};

export default function formReducer(state = fromJS({}), action) {
    const handler = FORM_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
