import { createSelector } from 'reselect';
import { selectApp } from '../../App/modules/selectors';

const makeSelectTaskListIds = () => createSelector(selectApp, appState => appState.getIn(['tasks', 'listOfIds']));

const makeSelectTaskEntries = () => createSelector(selectApp, appState => appState.getIn(['tasks', 'entries']));

export {
    makeSelectTaskListIds,
    makeSelectTaskEntries
};
