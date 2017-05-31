import React from 'react';
import PropTypes from 'prop-types';
// components
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';
import { Link } from 'react-router';
// intl
import messages from './messages';
// validate
import validate from './validate';
// style
import './ChangePwd.scss';


const renderError = (error) => (
    <div className='alert alert-dismissible alert-warning email'>
        <h4><FormattedMessage {...messages.warning} /></h4>
        <p>{error}</p>
    </div>
);

const renderValidError = (error) => (
    <div className='alert alert-dismissible alert-warning email'>
        <p>{error}</p>
    </div>
);

const renderSuccess = () => (
    <div className='alert alert-dismissible alert-success email'>
        <strong><FormattedMessage {...messages.success} /></strong> You successfully changed account email,
        <Link to='/login' className='alert-link'> please reauthentificated</Link>
    </div>
);

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div className={`form-group ${(error === undefined || error === '') ? '' : 'has-warning'}`}>
        <label className='control-label'><FormattedMessage {...messages[label]} /></label>
        <input className='form-control' {...input} type={type} placeholder={label} />
        {touched && error && (<br />)}
        {touched && error && renderValidError(error)}
    </div>
);

class ChangePassword extends React.Component {

    render() {
        const { handleSubmit, changedPwdSucceeded, submitting, valide, error } = this.props;

        return (
            <form className='col-md-6' onSubmit={handleSubmit}>
                <h4><strong><FormattedMessage {...messages.description} /></strong></h4>
                <br />
                <Field type='password' name='newPwd' component={renderField}
                    label='new_pwd' placeholder='enter new password'
                />
                <Field type='password' name='repeatPwd' component={renderField}
                    label='repeat_pwd' placeholder='repeat password'
                />
                {error !== undefined && renderError(error)}
                {changedPwdSucceeded && renderSuccess()}
                <br />
                <button type='submit' className='btn btn-primary' disabled={submitting && valide}>
                    <FormattedMessage {...messages.change_pwd_btn} />
                </button>
            </form>
        );
    }
}

ChangePassword.propTypes = {
    handleSubmit       : PropTypes.func,
    submitting         : PropTypes.bool,
    valide             : PropTypes.bool,
    error              : PropTypes.string,
    changedPwdSucceeded: PropTypes.bool
};

renderField.propTypes = {
    input: PropTypes.string,
    label: PropTypes.string,
    type : PropTypes.string,
    meta : PropTypes.object
};

export default reduxForm({
    form: 'change-pwd',
    validate
})(ChangePassword);
