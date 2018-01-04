// components
import App from '../components/App';
import { connect } from 'react-redux';
// selectors
import { createStructuredSelector } from 'reselect';
import {
    makeSelectSidebar,
    makeSelectEventsByIds,
    makeSelectEventsListOfIds,
    makeSelectAppConnectionState,
    browserLessThanMedium,
    makeSelectTheme
} from '../modules/selectors';
import { makeSelectLoggedIn } from '../../AppAuth/modules/selectors';
import { getCurrenPageLocation } from '../../../store/reducers/location';

// actions
import { bindActionCreators } from 'redux';
import { onSetDocked, onChangeSide, onSetOpen } from '../modules/sidebar';
import { startSync } from '../modules/sync';

const mapStateToProps = state =>
    createStructuredSelector({
        sidebar              : makeSelectSidebar(),
        loggedIn             : makeSelectLoggedIn(),
        eventsByIds          : makeSelectEventsByIds(),
        listOfEventsId       : makeSelectEventsListOfIds(),
        currentPage          : getCurrenPageLocation,
        connection           : makeSelectAppConnectionState(),
        browserLessThanMedium: browserLessThanMedium(),
        theme                : makeSelectTheme()
    });

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            onSetDocked,
            onChangeSide,
            onSetOpen,
            startSync
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(App);
