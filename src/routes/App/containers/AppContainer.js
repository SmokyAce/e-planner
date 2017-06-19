// components
import App from '../components/App';
import { connect } from 'react-redux';
// selectors
import { createStructuredSelector } from 'reselect';
import { makeSelectSidebar } from '../modules/selectors';
// actions
import { bindActionCreators } from 'redux';
import { onSetOpen, onSetDocked } from '../modules/sidebar';
import { startSync } from '../modules/sync';


const mapStateToProps = (state) => createStructuredSelector({
    sidebar: makeSelectSidebar()
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onSetOpen  : (open) => onSetOpen(open),
    onSetDocked: (docked) => onSetDocked(docked),
    startSync
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
