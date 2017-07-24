import React from 'react';
import PropTypes from 'prop-types';
// components
import { Field, reduxForm } from 'redux-form/immutable';
import RaisedButton from 'material-ui/RaisedButton';
import { FormattedMessage } from 'react-intl';
import ReduxFormTextField from '../Form/ReduxFormTextField';
// intl
import messages from './messages';


const renderTextField = props => (<ReduxFormTextField {...props} />);

const styles = {
    form: {
        paddingLeft : '20px',
        paddingRight: '20px'
    }
};

class SignUp extends React.Component {
    render() {
        return (
            <form
                style={styles.form}
                onSubmit={this.props.handleSubmit}
            >
                <Field
                    name='fullName'
                    component={renderTextField}
                    label={<FormattedMessage {...messages.full_name} />}
                /><br />
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
                    label={<FormattedMessage {...messages.register_btn} />}
                    fullWidth
                    primary
                />
            </form>
        );
    }
}

SignUp.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};
export default reduxForm({
    form: 'register'
    // validate
})(SignUp);
