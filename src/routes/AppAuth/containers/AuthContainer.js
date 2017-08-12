// components
import { connect } from 'react-redux';
import AuthPage from '../components/AuthPage';
// actions
import { bindActionCreators } from 'redux';
import { loginWithProviderRequest, loginRequest, registerRequest } from '../modules/actions';


const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    loginRequest,
    registerRequest,
    loginWithProviderRequest
}, dispatch);

export default connect(null, mapDispatchToProps)(AuthPage);
