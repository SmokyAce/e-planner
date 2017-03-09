import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const makeSelectSidebar = () => createSelector(
    selectGlobal,
    (globalState) => globalState.get('sidebar')
);

const makeSelectLoading = () => createSelector(
    selectGlobal,
    (globalState) => globalState.get('loading')
);


export {
    selectGlobal,
    makeSelectSidebar,
    makeSelectLoading
};
