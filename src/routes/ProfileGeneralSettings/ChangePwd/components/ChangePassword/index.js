import React from 'react';
import PropTypes from 'prop-types';
// components
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';
import { Link } from 'react-router';
import Warning from '../../../../../components/Indicators/Warning';
import Error from '../../../../../components/Indicators/Error';
import Success from '../../../../../components/Indicators/Success';
// intl
import messages from './messages';
// validate
import validate from './validate';
// style
import './ChangePwd.scss';


const renderSuccess = () => (
    <Success message={messages.changedPwdSucceeded}>
        <Link to='/login' className='alert-link'> please reauthentificated</Link>
    </Success>
);

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div className={`form-group ${(touched && error !== undefined) ? 'has-warning' : ''}`}>
        <label className='control-label'>
            <FormattedMessage {...messages[label]} />
        </label>
        <input className='form-control' {...input} type={type} />
        {touched && error && (<Warning message={messages[error]} />)}
    </div>
);


class ChangePassword extends React.Component {

    render() {
        const { handleSubmit, changedPwdSucceeded, submitting, error } = this.props;

        return (
            <form className='col-md-6' onSubmit={handleSubmit}>
                <h4><strong><FormattedMessage {...messages.description} /></strong></h4>
                <br />
                <Field type='password' name='newPwd' component={renderField} label='new_pwd' />
                <Field type='password' name='repeatPwd' component={renderField} label='repeat_pwd' />
                {error !== undefined && (<Error message={error} />)}
                {changedPwdSucceeded && renderSuccess()}
                <button type='submit' className='btn btn-primary' disabled={submitting}>
                    <FormattedMessage {...messages.change_pwd_btn} />
                </button>
            </form>
        );
    }
}

ChangePassword.propTypes = {
    handleSubmit       : PropTypes.func,
    submitting         : PropTypes.bool,
    error              : PropTypes.string,
    changedPwdSucceeded: PropTypes.bool
};

renderField.propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    type : PropTypes.string,
    meta : PropTypes.object
};

export default reduxForm({
    form: 'change-pwd',
    validate
})(ChangePassword);
