import React from 'react';
import PropTypes from 'prop-types';

// import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import messages from './messages';


const EmailVerified = ({ emailVerified, sendEmailVerification }) => {
    /* TODO: Реализовать интересное ожидание для пользователя
    Это может быть:
    - красивая анимация;
    - игра;
    - или ...
    */
    return (
        <div>
            <h3>
                <FormattedMessage {...messages.email_verified_description} />
            </h3>
            <h4>
                <FormattedMessage {...messages.email_verified_question} />
                <a className='btn btn-link' onClick={sendEmailVerification}>
                    <FormattedMessage {...messages.email_verified_retry_btn} />
                </a>
            </h4>
            <h4>
                <FormattedMessage {...messages.email_verified_success_desc} />
                <a className='btn btn-link' href='/app'>
                    <FormattedMessage {...messages.email_verified_success_btn} />
                </a>
            </h4>
        </div>
    );
};

EmailVerified.propTypes = {
    emailVerified        : PropTypes.bool,
    sendEmailVerification: PropTypes.func
};

export default EmailVerified;
