import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';


const SubmitForm = ({ children, email, password, error, onSubmit, onInputChange, messages }) => {
    const onFormSubmit = (event) => {
        event.preventDefault();
        onSubmit({ email, password });
    };

    const onChange = (event) => {
        onInputChange(event.target.name, event.target.value);
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
                    name='email' value={email} onChange={onChange}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='txtPass'>
                    <FormattedMessage {...messages.pwd} />
                </label>
                <input type='password' className='form-control' id='txtPass' placeholder='password'
                    name='password' value={password} onChange={onChange}
                />
            </div>
            <button type='submit' className='btn btn-primary btn-block'>
                <FormattedMessage {...messages.submit} />
            </button>
            { children }
        </form>
    );
};

SubmitForm.propTypes = {
    children     : PropTypes.element,
    email        : PropTypes.string,
    password     : PropTypes.string,
    error        : PropTypes.string,
    onSubmit     : PropTypes.func,
    onInputChange: PropTypes.func,
    messages     : PropTypes.object
};

export default SubmitForm;
