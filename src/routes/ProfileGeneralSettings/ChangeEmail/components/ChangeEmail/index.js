import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';
import messages from './messages';
import validate from './validate';


const renderError = (error) => (
    <div className='alert alert-warning' role='alert'>
        <span className='glyphicon glyphicon-exclamation-sign' aria-hidden='true' />
        <span className='sr-only'>Error:</span>
        {error}
    </div>
);

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <input className='form-control' {...input} type={type} />
        <br />
        {touched && error && <span>{renderError(error)}</span>}
    </div>
);

class ChangeEmail extends React.Component {

    render() {
        const { submitting, currentEmail } = this.props;

        return (
            <form className='col-md-9' onSubmit={this.props.handleSubmit}>
                <h4><strong><FormattedMessage {...messages.description} /></strong></h4>
                <br />
                <span>
                    <FormattedMessage {...messages.current_email} />
                    <strong> {currentEmail}</strong>
                </span>
                <br />
                <br />
                <div className='form-group'>
                    <label htmlFor='email'><FormattedMessage {...messages.new_email} />:</label>
                    <Field className='form-control' name='email' component='input' type='email'
                        placeholder='Email' label='Email'
                    />
                </div>
                <button type='submit' className='btn btn-primary' disabled={submitting}>
                    <FormattedMessage {...messages.submit} />
                </button>
            </form>
        );
    }
}

ChangeEmail.propTypes = {
    submitting  : PropTypes.bool,
    currentEmail: PropTypes.string,
    handleSubmit: PropTypes.func
};

renderField.propTypes = {
    meta : PropTypes.object,
    input: PropTypes.object,
    type : PropTypes.string,
    label: PropTypes.string
};

export default reduxForm({ form: 'change-email', validate })(ChangeEmail);
