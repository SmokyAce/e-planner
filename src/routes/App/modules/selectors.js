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

const makeSelectSidebarPullRight = () => createSelector(
    selectApp,
    (globalState) => globalState.getIn(['sidebar', 'pullRight'])
);

const makeSelectSidebarOpen = () => createSelector(
    selectApp,
    (globalState) => globalState.getIn(['sidebar', 'sidebarOpen'])
);

const makeSelectCurrentUser = () => createSelector(
    selectApp,
    (globalState) => globalState.get('user')
);

const makeSelectCurrentUserField = (field) => {
    return createSelector(
        selectApp,
        (globalState) => globalState.getIn(['user', field])
    );
};

const makeSelectCurrentUserEmail = () => createSelector(
    selectApp,
    (globalState) => globalState.getIn(['user', 'email'])
);

const makeSelectCurrentUserEvents = () => createSelector(
    selectApp,
    (globalState) => globalState.getIn(['user', 'events'])
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
    (globalState) => globalState.get('connection')
);

const makeSelectAppSyncState = () => createSelector(
    selectApp,
    (globalState) => globalState.getIn(['sync', 'status'])
);

const makeSelectAppRestoreState = () => createSelector(
    selectApp,
    (globalState) => globalState.get('restored')
);

const selectForm = (state) => state.get('form');

const makeSelectFormValues = (form) => createSelector(
    selectForm,
    (globalState) => globalState.getIn([form, 'values'])
);

export {
    selectApp,
    // sidebar
    makeSelectSidebar,
    makeSelectSidebarDocked,
    makeSelectSidebarOpen,
    makeSelectSidebarPullRight,
    // user
    makeSelectCurrentUser,
    makeSelectCurrentUserEmail,
    makeSelectCurrentUserEvents,
    makeSelectCurrentUserField,
    // connection status
    makeSelectAppConnectionState,
    // sync status
    makeSelectAppSyncState,
    // rehydrate
    makeSelectAppRestoreState,
    // events
    makeSelectEventsByIds,
    makeSelectEventsOptionsById,
    makeSelectEventsListOfIds,
    makeSelectEventsFormState,
    makeSelectEventsSettingsFormState,
    // form
    makeSelectFormValues
};
