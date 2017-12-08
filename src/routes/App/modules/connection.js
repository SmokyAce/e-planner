// ------------------------------------
// Constants
// ------------------------------------
const APP_CONNECTION_STATUS_CHANGE = 'app/CONNECTION_STATUS_CHANGE';

// ------------------------------------
// Actions
// ------------------------------------
export const changeFirebaseConnectionStatus = (status) => ({ type: APP_CONNECTION_STATUS_CHANGE, payload: status });


// ------------------------------------
// Reducer
// ------------------------------------
export default (state = 'Online', action) => {
    return action.type === APP_CONNECTION_STATUS_CHANGE
        ? action.payload
        : state;
};
