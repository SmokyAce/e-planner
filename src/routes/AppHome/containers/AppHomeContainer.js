import AppHome from '../components/AppHome';
import { connect } from 'react-redux';
// selectors
import { createStructuredSelector } from 'reselect';
import {
    selectRestored,
    makeSelectEventsByIds,
    makeSelectEventsListOfIds,
    makeSelectFormValues,
    makeSelectFormSyncErrors
} from '../../App/modules/selectors';
import { selectLocale } from '../../../containers/LanguageProvider/selectors';
// actions
import { bindActionCreators } from 'redux';
// import { startSync } from '../modules/sync';
import { removeEvent, toggleEventService, addEvent } from '../../App/modules/events';


const mapStateToProps = (state) => createStructuredSelector({
    restored      : selectRestored,
    eventsByIds   : makeSelectEventsByIds(),
    eventListOfIds: makeSelectEventsListOfIds(),
    locale        : selectLocale(),
    createEvent   : createStructuredSelector({
        values    : makeSelectFormValues('create-event'),
        syncErrors: makeSelectFormSyncErrors('create-event')
    })
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    removeEvent: (id) => removeEvent(id),
    addEvent,
    toggleEventService
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppHome);
