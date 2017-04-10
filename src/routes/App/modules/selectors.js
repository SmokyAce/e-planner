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
    selectApp,
    (globalState) => globalState.getIn(['users', 'currentUser'])
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

const makeSelectEventsByIds = () => createSelector(
    selectApp,
    (globalState) => globalState.getIn(['events', 'byIds'])
);

const makeSelectEventsOptionsById = (eventId) => createSelector(
    selectApp,
    (globalState) => globalState.getIn(['events', 'byIds', eventId]).toJS()
);

const makeSelectEventsListOfIds = () => createSelector(
    selectApp,
    (globalState) => globalState.getIn(['events', 'listOfIds'])
);

const makeSelectEventsFormState = () => createSelector(
    selectApp,
    (globalState) => globalState.getIn(['events', 'formState'])
);

const makeSelectEventsSettingsFormState = () => createSelector(
    selectApp,
    (globalState) => globalState.getIn(['events', 'settingsFormState']).toJS()
);

export {
    selectApp,
    makeSelectSidebar,
    // auth
    makeSelectFormState,
    makeSelectMessage,
    makeSelectLoggedIn,
    // user
    makeSelectCurrentUser,
    // events
    makeSelectEventsByIds,
    makeSelectEventsOptionsById,
    makeSelectEventsListOfIds,
    makeSelectEventsFormState,
    makeSelectEventsSettingsFormState
};
