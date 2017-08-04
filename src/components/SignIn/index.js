import React from 'react';
import PropTypes from 'prop-types';
// components
import { Field, reduxForm } from 'redux-form/immutable';
import RaisedButton from 'material-ui/RaisedButton';
import { FormattedMessage } from 'react-intl';
import ReduxFormTextField from '../Form/ReduxFormTextField';
import Error from '../Indicators/Error';
// validate
import validate from './validate';
// intl
import messages from './messages';


const renderTextField = props => {
    const { meta } = props;

    return (
        <ReduxFormTextField
            {...props}
            formattedError={<FormattedMessage {...messages[meta.error]} />}
        />
    );
};

renderTextField.propTypes = {
    meta: PropTypes.object
};

const styles = {
    form: {
        paddingLeft : '20px',
        paddingRight: '20px'
    }
};

class SignIn extends React.Component {
    render() {
        const { error } = this.props;

        return (
            <form
                style={styles.form}
                onSubmit={this.props.handleSubmit}
            >
                <Field
                    name='email'
                    component={renderTextField}
                    label={<FormattedMessage {...messages.email} />}
                /><br />
                <Field
                    name='password'
                    type='password'
                    component={renderTextField}
                    label={<FormattedMessage {...messages.pwd} />}
                /><br /><br />
                <RaisedButton
                    type='submit'
                    label={<FormattedMessage {...messages.login_btn} />}
                    fullWidth
                    primary
                /><br /><br />
                {error !== undefined && (<Error message={error} />)}
            </form>
        );
    }
}

SignIn.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    error       : PropTypes.string
};

export default reduxForm({
    form  : 'login',
    fields: ['email', 'password'],
    validate
})(SignIn);
