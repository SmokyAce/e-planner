// components
import { connect } from 'react-redux';
import EmailVerified from '../components/EmailVerified';
// actions
import { bindActionCreators } from 'redux';
import { sendEmailVerification } from '../modules/actions';
// selectors
import { createSelector } from 'reselect';
import { makeSelectEmailVerified } from '../../AppAuth/modules/selectors';


const mapDispatchToProps = (dispatch) => bindActionCreators({
    sendEmailVerification
}, dispatch);

const mapStateToProps = (state, ownProps) => createSelector(
    makeSelectEmailVerified(),
    (emailVerified) => ({
        emailVerified
    })
);

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerified);
