// components
import { connect } from 'react-redux';
import ProfileLayout from '../components/ProfileLayout';
// selectors
import { createStructuredSelector } from 'reselect';
import { makeSelectSidebarDocked } from '../../App/modules/selectors';
// actions
import { bindActionCreators } from 'redux';
import { onSetDocked } from '../../App/modules/sidebar';


const mapStateToProps = state => createStructuredSelector({
    sidebarDocked: makeSelectSidebarDocked()
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onSetDocked
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLayout);
