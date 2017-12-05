import { createSelector } from 'reselect';
import { selectApp } from '../../App/modules/selectors';

const makeSelectTaskListIds = () => createSelector(selectApp, appState => appState.getIn(['tasks', 'listOfIds']));

const makeSelectTaskEntries = () => createSelector(selectApp, appState => appState.getIn(['tasks', 'entries']));

const makeSelectEventTaskList = eventId =>
    createSelector(selectApp, appState => {
        return appState.getIn(['events', 'byIds', eventId, 'tasks']);
    });

const makeSelectTasksIdsByEventId = eventId =>
    createSelector(selectApp, appState => {
        return appState.getIn(['tasks', 'entries']).filter(task => task.eventId === eventId);
    });

export { makeSelectTaskListIds, makeSelectTaskEntries, makeSelectEventTaskList, makeSelectTasksIdsByEventId };
