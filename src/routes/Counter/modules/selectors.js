import { createSelector } from 'reselect';

const selectEvents = (state) => state.getIn(['app', 'events']);

const makeSelectEvent = (eventId) => createSelector(
    selectEvents,
    (globalState) => globalState.get(eventId)
);

const makeSelectEventCounter = (eventId) => createSelector(
    selectEvents,
    (globalState) => globalState.getIn([eventId, 'counter'])
);

export {
    selectEvents,
    makeSelectEvent,
    makeSelectEventCounter
};
