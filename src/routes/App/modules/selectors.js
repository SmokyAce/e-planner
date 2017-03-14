/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectApp = (state) => state.get('app');

const selectAuth = (state) => state.getIn(['app', 'auth']);

const makeSelectSidebar = () => createSelector(
    selectApp,
    (globalState) => globalState.get('sidebar')
);

const makeSelectCurrentUser = () => createSelector(
    selectAuth,
    (globalState) => globalState.get('currentUser')
);

const makeSelectLoading = () => createSelector(
    selectAuth,
    (globalState) => globalState.get('loading')
);

const makeSelectMessage = () => createSelector(
    selectAuth,
    (globalState) => globalState.get('message')
);

const makeSelectFormState = () => createSelector(
    selectAuth,
    (globalState) => globalState.get('formState')
);

const makeSelectLoggedIn = () => createSelector(
    selectAuth,
    (globalState) => globalState.get('loggedIn')
);

const makeSelectCurrentlySending = () => createSelector(
    selectAuth,
    (globalState) => globalState.get('currentlySending')
);

export {
    selectApp,
    makeSelectSidebar,
    makeSelectFormState,
    makeSelectCurrentUser,
    makeSelectLoading,
    makeSelectMessage,
    makeSelectLoggedIn,
    makeSelectCurrentlySending
};
