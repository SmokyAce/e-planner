import { createSelector } from 'reselect';


const selectAuth = (state) => state.get('auth');

const makeSelectLoggedIn = () => createSelector(
    selectAuth,
    (globalState) => globalState.get('loggedIn')
);

const makeSelectChangedEmailSucceeded = () => createSelector(
    selectAuth,
    (globalState) => globalState.get('changedEmailSucceeded')
);

const makeSelectChangedPwdSucceeded = () => createSelector(
    selectAuth,
    (globalState) => globalState.get('changedPwdSucceeded')
);

export {
    // auth
    makeSelectLoggedIn,
    makeSelectChangedEmailSucceeded,
    makeSelectChangedPwdSucceeded
};
