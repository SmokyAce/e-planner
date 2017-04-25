import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { changeForm } from '../App/modules/auth/actions';


const AuthForm = ({ email, password, onSubmit, error, messages, dispatch, children, formState }) => {

    const onFormSubmit = (event) => {
        event.preventDefault();
        dispatch(onSubmit({email, password}))
    };

    const _changeEmail = (event) => {
        _emitChange(formState.set('email', event.target.value));
    };

    const _changePassword = (event) => {
        _emitChange(formState.set('password', event.target.value));
    };

    const _emitChange = (newFormState) => {
        dispatch(changeForm(newFormState));
    };


    return (
        <form className='col-md-4' id='frmLogin' role='form' onSubmit={onFormSubmit}>
            <p>{error}</p>
            <h2><FormattedMessage {...messages.description} /></h2>
            <div className='form-group'>
                <label htmlFor='txtEmail'>
                    <FormattedMessage {...messages.email} />
                </label>
                <input type='email' className='form-control' id='txtEmail' placeholder='Enter email'
                       name='email' value={email} onChange={_changeEmail}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='txtPass'>
                    <FormattedMessage {...messages.pwd} />
                </label>
                <input type='password' className='form-control' id='txtPass' placeholder='password'
                       name='password' value={password} onChange={_changePassword}
                />
            </div>
            <button type='submit' className='btn btn-primary btn-block'>
                <FormattedMessage {...messages.submit} />
            </button>
            { children }
        </form>
    )
};

AuthForm.propTypes = {
    email: PropTypes.string.isRequired,
    password  : PropTypes.string.isRequired,
    messages : PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default AuthForm;