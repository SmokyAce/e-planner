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

export {
    // auth
    makeSelectFormState,
    makeSelectMessage,
    makeSelectLoggedIn,
    makeSelectEmailVerified
};
