import React, { Component } from 'react';
import PropTypes from 'prop-types';
// components
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import Loading from './Loading';
import { Field, reduxForm } from 'redux-form/immutable';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import H2 from '../../../../components/H2';
import ReduxFormTextField from '../../../../components/Form/ReduxFormTextField';
import SelectList from '../../../../components/Form/SelectList';
import LocaleToogle from '../../../../containers/LocaleToogle';
// translations
import { appLocales } from '../../../../i18n';
import messages from '../modules/messages';
// styles
import './AccountSettings.scss';

const renderTextField = props => {
    const { meta } = props;

    return <ReduxFormTextField {...props} formattedError={<FormattedMessage {...messages[meta.error]} />} />;
};

renderTextField.propTypes = {
    meta: PropTypes.object
};

const renderSelect = props => <SelectList {...props} />;

class AccountSettings extends Component {
    // shouldComponentUpdate = (nextState) => (nextState.locale === this.props.locale);

    render() {
        const { currentUser, onLocaleToggle, submitting, dirty, initialValues, locale } = this.props;

        if (!currentUser) {
            return <Loading />;
        }

        let photoURL = currentUser.get('photoURL');

        if (!photoURL && currentUser.get('providerData').size > 0) {
            photoURL = currentUser.getIn(['providerData', '0', 'photoURL']);
        }

        // if user settings 'language' is empty take from global locale
        return (
            <form role='form' onSubmit={this.props.handleSubmit}>
                <Paper zDepth={1} style={{ margin: '5px', padding: '10px' }}>
                    <H2>
                        <FormattedMessage {...messages.description} />
                    </H2>
                    <div>
                        <FormattedMessage {...messages.email} />:
                        <ins> {currentUser.get('email')} </ins>
                        <Link className='link' to='/app/profile/change-email'>
                            change email
                        </Link>
                    </div>
                    <Field
                        name='displayName'
                        component={renderTextField}
                        label={<FormattedMessage {...messages.displayName} />}
                    />
                    <br />
                    <Field
                        name='language'
                        label={<FormattedMessage {...messages.language} />}
                        component={LocaleToogle}
                        onChange={() => console.log('language was changed!!')}
                    />
                    <br />
                    <RaisedButton
                        type='submit'
                        label={<FormattedMessage {...messages.updateBtn} />}
                        primary
                        keyboardFocused
                        disabled={submitting || !dirty}
                    />
                </Paper>
            </form>
        );
    }
}

AccountSettings.propTypes = {
    currentUser   : PropTypes.object,
    onLocaleToggle: PropTypes.func.isRequired,
    handleSubmit  : PropTypes.func.isRequired,
    submitting    : PropTypes.bool.isRequired,
    dirty         : PropTypes.bool.isRequired,
    initialValues : PropTypes.object.isRequired,
    locale        : PropTypes.string.isRequired
};

export default reduxForm({
    form                   : 'account-settings',
    destroyOnUnmount       : false,
    enableReinitialize     : true,
    keepDirtyOnReinitialize: true
    // validate
})(AccountSettings);
