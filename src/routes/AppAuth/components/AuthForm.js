import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import SubmitForm from './SubmitForm.js';
import SocialButton from './SocialButton.js';


const AuthForm = ({ formState, message, onSubmit, onInputChange, onButtonClick, type }) => {
    messages.description = messages[`${type}_description`];
    messages.submit = messages[`${type}_btn`];

    const renderReset = () => {
        if (type === 'register') return null;
        return (
            <h5><Link to='/reset'>
                <FormattedMessage {...messages.forgot_pwd} />
            </Link></h5>
        );
    };

    return (
        <div>
            <div className='col-md-4' />
            <SubmitForm email={formState.get('email')} password={formState.get('password')} messages={messages}
                onSubmit={onSubmit} error={message} onInputChange={onInputChange}
            >
                <br />
                {renderReset()}
                <SocialButton name='Google' message={messages.login_with} onButtonClick={onButtonClick} />
                { /* <SocialButton name="Facebook" message={messages.login_with} onButtonClick={onButtonClick}/>
                <SocialButton name="Twitter" message={messages.login_with} onButtonClick={onButtonClick}/> */ }
            </SubmitForm>
        </div>
    );
};

AuthForm.propTypes = {
    type         : PropTypes.string,
    formState    : PropTypes.instanceOf(Map),
    message      : PropTypes.string,
    onSubmit     : PropTypes.func,
    onInputChange: PropTypes.func,
    onButtonClick: PropTypes.func
};

export default AuthForm;
