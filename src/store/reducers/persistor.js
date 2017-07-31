import { REHYDRATE } from 'redux-persist/constants';


// ------------------------------------
// Reducer
// ------------------------------------
export default (state = false, action) => {
    return action.type === REHYDRATE
        ? true
        : state;
};
