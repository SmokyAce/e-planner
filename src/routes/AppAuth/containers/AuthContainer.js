import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginWithProviderRequest, changeForm } from '../modules/actions';
import { createSelector } from 'reselect';
import { makeSelectFormState, makeSelectMessage } from '../../AppAuth/modules/selectors';

import AuthForm from '../components/AuthForm';

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    onSubmit     : ownProps.onSubmit,
    onButtonClick: loginWithProviderRequest,
    onInputChange: changeForm
}, dispatch);

const mapStateToProps = (state, ownProps) => createSelector(
    makeSelectFormState(),
    makeSelectMessage(),
    (formState, message) => ({
        formState,
        message,
        type: ownProps.type
    })
);

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
