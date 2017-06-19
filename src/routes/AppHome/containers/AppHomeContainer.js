import AppHome from '../components/AppHome';
import { connect } from 'react-redux';
// selectors
import { createStructuredSelector } from 'reselect';
import {
    makeSelectSidebarDocked,
    makeSelectSidebarPullRight,
    makeSelectAppRestoreState
} from '../../App/modules/selectors';
// actions
import { bindActionCreators } from 'redux';
// import { startSync } from '../modules/sync';
import { onSetOpen, onSetDocked, onChangeSide } from '../../App/modules/sidebar';


const mapStateToProps = (state) => createStructuredSelector({
    docked   : makeSelectSidebarDocked(),
    pullRight: makeSelectSidebarPullRight(),
    restored : makeSelectAppRestoreState()
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onSetOpen   : (open) => onSetOpen(open),
    onSetDocked : (docked) => onSetDocked(docked),
    onChangeSide: (pullRight) => onChangeSide(pullRight)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppHome);
