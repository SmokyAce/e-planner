// components
import App from '../components/App';
import { connect } from 'react-redux';
// selectors
import { createStructuredSelector } from 'reselect';
import {
    makeSelectSidebar,
    makeSelectEventsByIds,
    makeSelectEventsListOfIds,
    makeSelectAppConnectionState
} from '../modules/selectors';
import { makeSelectLoggedIn } from '../../AppAuth/modules/selectors';
import { getCurrenPageLocation } from '../../../store/reducers/location';

// actions
import { bindActionCreators } from 'redux';
import { onSetOpen, onSetDocked, onChangeSide } from '../modules/sidebar';
import { startSync } from '../modules/sync';


const mapStateToProps = (state) => createStructuredSelector({
    sidebar       : makeSelectSidebar(),
    loggedIn      : makeSelectLoggedIn(),
    eventsByIds   : makeSelectEventsByIds(),
    listOfEventsId: makeSelectEventsListOfIds(),
    currentPage   : getCurrenPageLocation,
    connection    : makeSelectAppConnectionState()
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onSetOpen   : (open) => onSetOpen(open),
    onSetDocked : (docked) => onSetDocked(docked),
    onChangeSide: (pullRight) => onChangeSide(pullRight),
    startSync,
    dispatch
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
