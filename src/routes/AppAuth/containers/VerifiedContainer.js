// components
import { connect } from 'react-redux';
import EmailVerified from '../components/EmailVerified';
// actions
import { bindActionCreators } from 'redux';
import { sendEmailVerificationRequest } from '../modules/actions';
// selectors
import { createSelector } from 'reselect';
import { makeSelectEmailVerified } from '../../AppAuth/modules/selectors';


const mapDispatchToProps = (dispatch) => bindActionCreators({
    sendEmailVerification: sendEmailVerificationRequest
}, dispatch);

const mapStateToProps = (state, ownProps) => createSelector(
    makeSelectEmailVerified(),
    (emailVerified) => ({
        emailVerified
    })
);

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerified);
