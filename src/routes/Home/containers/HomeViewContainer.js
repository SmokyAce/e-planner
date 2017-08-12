import Home from '../components/HomeView';
import { connect } from 'react-redux';
// selectors
import { createStructuredSelector } from 'reselect';
// actions
import { bindActionCreators } from 'redux';
import {
    loginRequest,
    loginWithProviderRequest,
    registerRequest
} from '../../AppAuth/modules/actions';


const mapStateToProps = (state) => createStructuredSelector({
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    loginRequest,
    registerRequest,
    loginWithProviderRequest
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
