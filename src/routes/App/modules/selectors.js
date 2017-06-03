/**
 * The global state selectors
 */
import { createSelector } from 'reselect';

const selectApp = (state) => state.get('app');

const makeSelectSidebar = () => createSelector(
    selectApp,
    (globalState) => globalState.get('sidebar')
);

const makeSelectSidebarDocked = () => createSelector(
    selectApp,
    (globalState) => globalState.getIn(['sidebar', 'sidebarDocked'])
);

const makeSelectSidebarOpen = () => createSelector(
    selectApp,
    (globalState) => globalState.getIn(['sidebar', 'sidebarOpen'])
);

const makeSelectCurrentUser = () => createSelector(
    selectApp,
    (globalState) => globalState.getIn(['users', 'currentUser'])
);

const makeSelectCurrentUserField = (field) => {
    return createSelector(
        selectApp,
        (globalState) => globalState.getIn(['users', 'currentUser', field])
    );
};

const makeSelectCurrentUserEmail = () => createSelector(
    selectApp,
    (globalState) => globalState.getIn(['users', 'currentUser', 'email'])
);

const makeSelectCurrentUserEvents = () => createSelector(
    selectApp,
    (globalState) => globalState.getIn(['users', 'currentUser', 'events'])
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

const makeSelectAppConnectionState = () => createSelector(
    selectApp,
    (globalState) => globalState.getIn(['status', 'connection'])
);

const makeSelectAppSyncState = () => createSelector(
    selectApp,
    (globalState) => globalState.getIn(['status', 'isSync'])
);

export {
    selectApp,
    // sidebar
    makeSelectSidebar,
    makeSelectSidebarDocked,
    makeSelectSidebarOpen,
    // user
    makeSelectCurrentUser,
    makeSelectCurrentUserEmail,
    makeSelectCurrentUserEvents,
    makeSelectCurrentUserField,
    // status
    makeSelectAppConnectionState,
    makeSelectAppSyncState,
    // events
    makeSelectEventsByIds,
    makeSelectEventsOptionsById,
    makeSelectEventsListOfIds,
    makeSelectEventsFormState,
    makeSelectEventsSettingsFormState
};
