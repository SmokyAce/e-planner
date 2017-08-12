/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
    login_description: {
        id            : 'app.login.description',
        defaultMessage: 'Sign in'
    },
    register_description: {
        id            : 'app.register.description',
        defaultMessage: 'Create an account'
    },
    change_description: {
        id            : 'app.change-pwd.description',
        defaultMessage: 'Register'
    },
    email: {
        id            : 'app.email',
        defaultMessage: 'Email'
    },
    pwd: {
        id            : 'app.pwd',
        defaultMessage: 'Password'
    },
    login_btn: {
        id            : 'app.login.btn',
        defaultMessage: 'Login'
    },
    register_btn: {
        id            : 'app.register.btn',
        defaultMessage: 'Register'
    },
    forgot_pwd: {
        id            : 'app.login.forgot-pwd',
        defaultMessage: 'Forgot password?'
    },
    login_with: {
        id            : 'app.login.with',
        defaultMessage: 'Login with'
    },
    new_pwd: {
        id            : 'app.change-pwd.new-pwd',
        defaultMessage: 'New password'
    },
    change_pwd_btn: {
        id            : 'app.change-pwd.btn',
        defaultMessage: 'Change password'
    },
    reset_pwd_btn: {
        id            : 'app.change-pwd.btn',
        defaultMessage: 'Change password'
    },
    email_verified_description: {
        id            : 'app.email-verified.description',
        defaultMessage: 'Please check your email and follow link for register verification!'
    },
    email_verified_retry_btn: {
        id            : 'app.email-verified.retry-btn',
        defaultMessage: 'send again!'
    },
    email_verified_question: {
        id            : 'app.email-verified.question',
        defaultMessage: 'If you didn\'t receive the message please'
    },
    email_verified_success_desc: {
        id            : 'app.email-verified.success-description',
        defaultMessage: 'After your success verification'
    },
    email_verified_success_btn: {
        id            : 'app.email-verified.success-btn',
        defaultMessage: 'go to app!'
    }
});
