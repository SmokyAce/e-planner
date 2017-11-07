import { createSelector } from 'reselect';
import { selectApp } from '../../App/modules/selectors';

const makeSelectEventTasksList = eventId => createSelector(selectApp, appState => appState.getIn(['events', 'tasks']));

const makeSelectEventTasksByIds = eventId =>
    createSelector(selectApp, makeSelectEventTasksList(eventId), (appState, eventTasksList) => {
        return appState.getIn(['tasks']);
    });

export default {
    makeSelectEventTasksList,
    makeSelectEventTasksByIds
};
