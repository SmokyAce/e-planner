/**
 * The global state selectors
 */
import { createSelector } from 'reselect';


const selectAuth = (state) => state.get('auth');


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

const makeSelectEmailVerified = () => createSelector(
    selectAuth,
    (globalState) => globalState.getIn(['currentUser', 'emailVerified'])
);

const makeSelectChangedEmailSucceeded = () => createSelector(
    selectAuth,
    (globalState) => globalState.get('changedEmailSucceeded')
);

const makeSelectChangedPwdSucceeded = () => createSelector(
    selectAuth,
    (globalState) => globalState.get('changedPwdSucceeded')
);

const makeSelectCurrentUserEmail = () => createSelector(
    selectAuth,
    (globalState) => globalState.getIn(['currentUser', 'email'])
);

export {
    // auth
    makeSelectFormState,
    makeSelectMessage,
    makeSelectLoggedIn,
    makeSelectEmailVerified,
    makeSelectChangedEmailSucceeded,
    makeSelectChangedPwdSucceeded,
    makeSelectCurrentUserEmail
};
