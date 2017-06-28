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
import './ChangeEmail.scss';


const renderSuccess = () => (
    <Success message={messages.changedEmailSucceeded}>
        <Link to='/login' className='alert-link'> please reauthentificated</Link>
    </Success>
);

const renderField = ({ input, label, type, meta: { touched, visited, error } }) => (
    <div className={`form-group ${(touched && error !== undefined) ? 'has-warning' : ''}`}>
        <label className='control-label'>
            <FormattedMessage {...messages[label]} />
        </label>
        <input className='form-control' {...input} type={type} />
        {touched && error && (<Warning message={messages[error]} />)}
    </div>
);

class ChangeEmail extends React.Component {
    render() {
        const { submitting, currentEmail, error, changedEmailSucceeded } = this.props;

        return (
            <form className='col-md-6' onSubmit={this.props.handleSubmit}>
                <h4><strong><FormattedMessage {...messages.description} /></strong></h4>
                <br />
                <span>
                    <FormattedMessage {...messages.current_email} />
                    <strong> {currentEmail}</strong>
                </span>
                <br />
                <br />
                <Field type='email' name='email' component={renderField} label='newEmail' />
                {error !== undefined && (<Error message={error} />)}
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

renderField.propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    type : PropTypes.string,
    meta : PropTypes.object
};

export default reduxForm({
    form            : 'change-email',
    // we need to keep values of field after change locale
    destroyOnUnmount: false,
    validate
})(ChangeEmail);
