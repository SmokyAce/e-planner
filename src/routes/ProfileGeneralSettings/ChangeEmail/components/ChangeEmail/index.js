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
import './ChangeEmail.scss';


const renderError = (error) => (
    <div className='alert alert-dismissible alert-warning email'>
        <h4><FormattedMessage {...messages.warning} /></h4>
        <p>{error}</p>
    </div>
);

const renderSuccess = () => (
    <div className='alert alert-dismissible alert-success email'>
        <strong><FormattedMessage {...messages.success} /></strong> You successfully changed account email,
        <Link to='/login' className='alert-link'> please reauthentificated</Link>
    </div>
);

class ChangeEmail extends React.Component {

    render() {
        const { submitting, currentEmail, error, changedEmailSucceeded } = this.props;

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
                    <Field className='form-control email' name='email' component='input' type='email'
                        placeholder='Email' label='Email'
                    />
                </div>
                {error !== undefined && renderError(error)}
                {changedEmailSucceeded && renderSuccess()}
                <button type='submit' className='btn btn-primary' disabled={submitting}>
                    <FormattedMessage {...messages.submit} />
                </button>
            </form>
        );
    }
}

ChangeEmail.propTypes = {
    submitting           : PropTypes.bool,
    changedEmailSucceeded: PropTypes.bool,
    currentEmail         : PropTypes.string,
    handleSubmit         : PropTypes.func,
    error                : PropTypes.string
};

export default reduxForm({
    form            : 'change-email',
    // we need to keep values of field after change locale
    destroyOnUnmount: false,
    validate
})(ChangeEmail);
