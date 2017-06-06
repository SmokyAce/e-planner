import React, { Component } from 'react';
import PropTypes from 'prop-types';
// components
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import Loading from './Loading';
import { Field, reduxForm } from 'redux-form/immutable';
import ExtendField from '../../../../components/Form/ExtendField';
import SelectList from '../../../../components/Form/SelectList';
// translations
import { appLocales } from '../../../../i18n';
import messages from '../modules/messages';
// styles
import './AccountSettings.scss';


const renderField = (props) => (<ExtendField {...props} />);

const renderSelect = (props) => (<SelectList {...props} />);

class AccountSettings extends Component {

    render() {
        const { currentUser, onLocaleToggle, submitting } = this.props;

        if (!currentUser) {
            return <Loading />;
        }

        let photoURL = currentUser.get('photoURL');

        if (!photoURL && currentUser.get('providerData').size > 0) {
            photoURL = currentUser.getIn(['providerData', '0', 'photoURL']);
        }

        return (
            <form id='frmProfile' role='form' onSubmit={this.props.handleSubmit}>
                <h4><strong><FormattedMessage {...messages.description} /></strong></h4>
                <div className='col-md-6 custom-settings'>
                    <br />
                    <div className='form-group form-inline'>
                        <label htmlFor='email' id='label'><FormattedMessage {...messages.email} />:</label>
                        <ins>{currentUser.get('email')}</ins>
                        <Link className='link' to='/app/profile/change-email' >change email</Link>
                    </div>
                    <Field name='displayName' label='displayName' type='text'
                        component={renderField} messages={messages} inline
                    />
                    <div className='form-group form-inline'>
                        <label className='control-label' id='label'>
                            <FormattedMessage {...messages.sex} />
                        </label>
                        <label className='radio-inline'>
                            <Field name='sex' component='input' type='radio' value='male' />
                            <FormattedMessage {...messages.male} />
                        </label>
                        <label className='radio-inline'>
                            <Field name='sex' component='input' type='radio' value='female' />
                            <FormattedMessage {...messages.female} />
                        </label>
                    </div>
                    <Field name='language' label='language' onChange={(e, nextValue) => onLocaleToggle(nextValue)}
                        component={renderSelect} messages={messages} data={appLocales} inline
                    />
                    <div className='button-container'>
                        <button type='submit' className='btn btn-primary' disabled={submitting}>
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
    onLocaleToggle: PropTypes.func.isRequired,
    handleSubmit  : PropTypes.func.isRequired,
    submitting    : PropTypes.bool.isRequired
};

export default reduxForm({
    form: 'account-settings'
    // validate
})(AccountSettings);
