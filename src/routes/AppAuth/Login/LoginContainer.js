import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginRequest, loginWithProviderRequest, changeForm } from '../../App/modules/auth/actions';
import { createSelector } from 'reselect';
import { makeSelectFormState, makeSelectMessage } from '../../App/modules/selectors';

import UserLogin from '../components/AuthForm';

const mapDispatchToProps = dispatch => bindActionCreators({
    onSubmit     : loginRequest,
    onButtonClick: loginWithProviderRequest,
    onInputChange: changeForm
}, dispatch);

const mapStateToProps = state => createSelector(
    makeSelectFormState(),
    makeSelectMessage(),
    (formState, message) => ({
        formState,
        message,
        type: 'login'
    })
);

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
