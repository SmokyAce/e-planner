/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
    full_name: {
        id            : 'app.full-name',
        defaultMessage: 'Full name'
    },
    email: {
        id            : 'app.email',
        defaultMessage: 'Email'
    },
    pwd: {
        id            : 'app.pwd',
        defaultMessage: 'Password'
    },
    register_btn: {
        id            : 'app.register.btn',
        defaultMessage: 'Register'
    },
    required: {
        id            : 'app.notification.required',
        defaultMessage: 'This is required field!'
    },
    invalidEmail: {
        id            : 'app.notification.invalid-email',
        defaultMessage: 'Invalid e-mail address!'
    }
});
