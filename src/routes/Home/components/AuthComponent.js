import React from 'react';
import PropTypes from 'prop-types';
// components
import { Field, reduxForm } from 'redux-form/immutable';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


// import { Map } from 'immutable';

// import { Link } from 'react-router';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages_';
// import SocialButton from './SocialButton.js';
const renderTextField = ({ input, label, meta: { touched, error }, ...custom, style }) => (
    <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
        style
        fullWidth
    />
);

renderTextField.propTypes = {
    input   : PropTypes.object,
    label   : PropTypes.string,
    type    : PropTypes.string,
    meta    : PropTypes.object,
    messages: PropTypes.object,
    inline  : PropTypes.bool,
    style   : PropTypes.object
};

const AuthForm = props => {
    return (
        <Paper zDepth={2} style={{ paddingLeft: '30px', paddingRight: '30px' }} >
            <form>
                <div>
                    <h1 style={{ paddingTop: '20px' }}>Sign in</h1>
                </div>
                <hr />
                <Field
                    name='firstName'
                    component={renderTextField}
                    label='Full name'
                /><br />
                <Field
                    name='email'
                    component={renderTextField}
                    label='E-mail'
                /><br />
                <Field
                    name='password'
                    component={renderTextField}
                    label='Password'
                /><br />
                <br />
                <RaisedButton label='Sign in' fullWidth primary />
                <br />
            </form>
            <div className='hr-label'>
                <span>or</span>
            </div>
            <RaisedButton
                className='goggle-social-btn'
                label='Sign in with Goggle'
                icon={<i className='fa fa-google fa-lg' />}
                style={{ marginBottom: '20px' }}
                labelStyle={{ borderLeft: '1px solid #e2e2e2' }}
                fullWidth
                primary
            />
        </Paper>
    );
};

AuthForm.propTypes = {
};

export default reduxForm({
    form: 'register'
    // validate
})(AuthForm);
