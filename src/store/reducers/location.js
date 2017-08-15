import { fromJS } from 'immutable';
import { browserHistory } from 'react-router';

// ------------------------------------
// Constants
// ------------------------------------
export const LOCATION_CHANGE = 'LOCATION_CHANGE';

// ------------------------------------
// Actions
// ------------------------------------
export function locationChange(location = '/') {
    return {
        type   : LOCATION_CHANGE,
        payload: location
    };
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const updateLocation = ({ dispatch }) => {
    return (nextLocation) => dispatch(locationChange(nextLocation));
};

// Selector
export const getCurrenPageLocation = (state) => {
    let currPage = 'home';
    const breadcrumbs = state.getIn(['location', 'pathname']).split('/');

    if (breadcrumbs.length > 2) {
        currPage = breadcrumbs[2];
    }
    return currPage;
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS(browserHistory.getCurrentLocation());

export const location = (state = initialState, action) => {
    return action.type === LOCATION_CHANGE
        ? fromJS(action.payload)
        : state;
};
