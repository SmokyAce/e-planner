// components
import { connect } from 'react-redux';
import EmailVerified from '../components/EmailVerified';
// actions
import { bindActionCreators } from 'redux';
import { sendEmailVerificationRequest } from '../modules/actions';


const mapDispatchToProps = (dispatch) => bindActionCreators({
    sendEmailVerification: sendEmailVerificationRequest
}, dispatch);

export default connect(null, mapDispatchToProps)(EmailVerified);
