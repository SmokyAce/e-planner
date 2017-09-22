import { createSelector } from 'reselect';

const selectEventsByIds = (state) => state.getIn(['app', 'events', 'byIds']);

const makeSelectEvent = (eventId) => createSelector(
    selectEventsByIds,
    (globalState) => globalState.get(eventId)
);

const makeSelectEventCounter = (eventId) => createSelector(
    selectEventsByIds,
    (globalState) => globalState.getIn([eventId, 'counter'])
);

export {
    selectEventsByIds,
    makeSelectEvent,
    makeSelectEventCounter
};
