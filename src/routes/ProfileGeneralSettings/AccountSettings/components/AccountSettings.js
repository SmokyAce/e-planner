import React, { Component } from 'react';
import PropTypes from 'prop-types';
// components
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import Loading from './Loading';
import LocaleToogle from '../../../../components/LocaleToogle';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form/immutable';
import Warning from '../../../../components/Indicators/Warning';
// import Error from '../../../../components/Indicators/Error';
// import Success from '../../../../components/Indicators/Success';
// translations
import messages from '../modules/messages';
// styles
import './AccountSettings.scss';


const renderField = ({ input, label, type, meta: { touched, error }, inline, initialValue }) => {
    const inlineForm = inline ? 'form-inline' : '';
    const hasWarning = (touched && error !== undefined) ? 'has-warning' : '';

    return (
        <div className={`form-group ${hasWarning} ${inlineForm}`}>
            <label className='control-label'>
                <FormattedMessage {...messages[label]} />
            </label>
            <input className='form-control' {...input} type={type} value={initialValue} />
            {touched && error && (<Warning message={messages[error]} />)}
        </div>
    );
};

class AccountSettings extends Component {

    render() {
        const { currentUser, locale, onLocaleToggle, fields: { displayName } } = this.props;

        if (!currentUser) {
            return <Loading />;
        }

        let photoURL = currentUser.get('photoURL');

        if (!photoURL && currentUser.get('providerData').size > 0) {
            photoURL = currentUser.getIn(['providerData', '0', 'photoURL']);
        }

        return (
            <form id='frmProfile' role='form'>
                <h4><strong><FormattedMessage {...messages.account_settings_description} /></strong></h4>
                <div className='col-md-6 custom-settings'>
                    <br />
                    <div className='form-group form-inline'>
                        <label htmlFor='email'><FormattedMessage {...messages.email} />:</label>
                        <ins>{currentUser.get('email')}</ins>
                        <Link className='link' to='/app/profile/change-email' >change email</Link>
                    </div>
                    <Field name='displayName' label='displayName' type='text' initialValue={displayName}
                        component={renderField} inline
                    />
                    <div className='form-group form-inline'>
                        <label htmlFor='Sex'><FormattedMessage {...messages.sex} />:</label>
                        <NavDropdown className='form-control' id='lang-dropdown'
                            title={!currentUser.get('sex') ? 'Female' : currentUser.get('sex')}
                        >
                            <MenuItem>Male</MenuItem>
                            <MenuItem>Female</MenuItem>
                        </NavDropdown>
                    </div>
                    <div className='form-group form-inline'>
                        <label htmlFor='Language'><FormattedMessage {...messages.language} />:</label>
                        <LocaleToogle locale={locale} onLocaleToggle={onLocaleToggle} className='form-control' />
                    </div>
                    <div className='button-container'>
                        <button type='submit' className='btn btn-primary'>
                            <FormattedMessage {...messages.update_btn} />
                        </button>
                    </div>
                </div>
                <div className='col-md-3' />
                <div className='col-md-3 media text-center'>
                    <a href='#'>
                        <img className='media-object img-responsive center-block' src={photoURL} />
                    </a>
                    <a role='button'>change photo</a>
                </div>
            </form>
        );
    }

}

AccountSettings.propTypes = {
    currentUser   : PropTypes.object,
    locale        : PropTypes.string.isRequired,
    onLocaleToggle: PropTypes.func.isRequired,
    fields        : PropTypes.object
    // updateUserInfoRequest: PropTypes.func.isRequired,
};

renderField.propTypes = {
    input       : PropTypes.object,
    label       : PropTypes.string,
    type        : PropTypes.string,
    meta        : PropTypes.object,
    inline      : PropTypes.bool,
    initialValue: PropTypes.string
};

export default reduxForm({
    form  : 'account-settings',
    fields: { displayName: 'Andranik Simonyan' }
    // validate
})(AccountSettings);
