import AppHome from '../components/AppHome';
import { connect } from 'react-redux';
// selectors
import { createStructuredSelector } from 'reselect';
import {
    makeSelectSidebarDocked,
    makeSelectSidebarPullRight,
    makeSelectAppRestoreState,
    makeSelectEventsByIds
} from '../../App/modules/selectors';
import { selectLocale } from '../../../containers/LanguageProvider/selectors';
// actions
import { bindActionCreators } from 'redux';
// import { startSync } from '../modules/sync';
import { onSetOpen, onSetDocked, onChangeSide } from '../../App/modules/sidebar';
import { removeEvent } from '../../App/modules/events';


const mapStateToProps = (state) => createStructuredSelector({
    docked     : makeSelectSidebarDocked(),
    pullRight  : makeSelectSidebarPullRight(),
    restored   : makeSelectAppRestoreState(),
    eventsByIds: makeSelectEventsByIds(),
    locale     : selectLocale()
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onSetOpen   : (open) => onSetOpen(open),
    onSetDocked : (docked) => onSetDocked(docked),
    onChangeSide: (pullRight) => onChangeSide(pullRight),
    removeEvent : (id) => removeEvent(id)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppHome);
