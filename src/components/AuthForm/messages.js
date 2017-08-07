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
    login_action: {
        id            : 'app.login.action',
        defaultMessage: 'sign in'
    },
    register_action: {
        id            : 'app.register.action',
        defaultMessage: 'create an account'
    },
    login_with_goggle: {
        id            : 'app.login.with-goggle',
        defaultMessage: 'Sign in with Goggle'
    },
    or: {
        id            : 'app.auth-form.or',
        defaultMessage: 'or'
    }
});
