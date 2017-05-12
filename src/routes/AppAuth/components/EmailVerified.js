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
            <button className='btn btn-primary' onClick={sendEmailVerification}>
                <FormattedMessage {...messages.email_verified_retry_btn} />
            </button>
        </div>
    );
};

EmailVerified.propTypes = {
    emailVerified        : PropTypes.bool,
    sendEmailVerification: PropTypes.func
};

export default EmailVerified;
