import AppHome from '../components/AppHome';
import { connect } from 'react-redux';
// selectors
import { createStructuredSelector } from 'reselect';
import {
    makeSelectSidebarDocked,
    makeSelectSidebarPullRight,
    makeSelectAppRestoreState,
    makeSelectEventsByIds,
    makeSelectFormValues
} from '../../App/modules/selectors';
import { selectLocale } from '../../../containers/LanguageProvider/selectors';
// actions
import { bindActionCreators } from 'redux';
// import { startSync } from '../modules/sync';
import { onSetOpen, onSetDocked, onChangeSide } from '../../App/modules/sidebar';
import { removeEvent, toggleEventService, addEvent } from '../../App/modules/events';


const mapStateToProps = (state) => createStructuredSelector({
    docked     : makeSelectSidebarDocked(),
    pullRight  : makeSelectSidebarPullRight(),
    restored   : makeSelectAppRestoreState(),
    eventsByIds: makeSelectEventsByIds(),
    locale     : selectLocale(),
    formValues : makeSelectFormValues('create-event')
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onSetOpen   : (open) => onSetOpen(open),
    onSetDocked : (docked) => onSetDocked(docked),
    onChangeSide: (pullRight) => onChangeSide(pullRight),
    removeEvent : (id) => removeEvent(id),
    addEvent,
    toggleEventService
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppHome);
