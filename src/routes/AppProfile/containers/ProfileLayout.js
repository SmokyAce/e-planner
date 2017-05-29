// components
import { connect } from 'react-redux';
import ProfileLayout from '../components/ProfileLayout';
// selectors
import { createStructuredSelector } from 'reselect';
import { makeSelectSidebarDocked, makeSelectSidebarOpen } from '../../App/modules/selectors';
// actions
import { bindActionCreators } from 'redux';
import { onSetDocked, onSetOpen } from '../../App/modules/sidebar';


const mapStateToProps = state => createStructuredSelector({
    sidebarOpened: makeSelectSidebarOpen(),
    sidebarDocked: makeSelectSidebarDocked()
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onSetDocked,
    onSetOpen
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLayout);
