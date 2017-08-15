// components
import { connect } from 'react-redux';
import Contractors from '../components/Contractors';
// selectors
import { createStructuredSelector } from 'reselect';
// actions
import { bindActionCreators } from 'redux';


const mapStateToProps = state => createStructuredSelector({
    // sidebarDocked: makeSelectSidebarDocked()
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    // onSetDocked
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Contractors);
