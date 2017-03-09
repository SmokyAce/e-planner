/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectApp = (state) => state.get('app');

const makeSelectCurrentUser = () => createSelector(
    selectApp,
    (globalState) => globalState.get('currentUser')
);

const makeSelectLoading = () => createSelector(
    selectApp,
    (globalState) => globalState.get('loading')
);

const makeSelectMessage = () => createSelector(
    selectApp,
    (globalState) => globalState.get('message')
);

const makeSelectFormState = () => createSelector(
    selectApp,
    (globalState) => globalState.get('formState')
);

export {
    selectApp,
    makeSelectFormState,
    makeSelectCurrentUser,
    makeSelectLoading,
    makeSelectMessage
};
