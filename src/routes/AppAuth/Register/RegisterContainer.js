import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { registerRequest, loginWithProviderRequest, changeForm } from '../../App/modules/auth/actions';
import { createSelector } from 'reselect';
import { makeSelectFormState, makeSelectMessage } from '../../App/modules/selectors';

import UserRegister from '../components/AuthForm';

const mapDispatchToProps = dispatch => bindActionCreators({
    onSubmit     : registerRequest,
    onButtonClick: loginWithProviderRequest,
    onInputChange: changeForm
}, dispatch);

const mapStateToProps = state => createSelector(
    makeSelectFormState(),
    makeSelectMessage(),
    (formState, message) => ({
        formState,
        message,
        type: 'register'
    })
);

export default connect(mapStateToProps, mapDispatchToProps)(UserRegister);
