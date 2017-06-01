import { defineMessages } from 'react-intl';


export default defineMessages({
    description: {
        id            : 'app.change-email.description',
        defaultMessage: 'Change e-mail address'
    },
    current_email: {
        id            : 'app.change-email.current-email',
        defaultMessage: 'Your email address is currently'
    },
    newEmail: {
        id            : 'app.change-email.new-email',
        defaultMessage: 'New email address'
    },
    submit: {
        id            : 'app.change-email.btn',
        defaultMessage: 'Change email'
    },
    changedEmailSucceeded: {
        id            : 'app.change-email.email-succeeded-change',
        defaultMessage: 'Your account email was changed succeeded!'
    },
    required: {
        id            : 'app.notification.required',
        defaultMessage: 'This is required field!'
    },
    invalidEmail: {
        id            : 'app.notification.invalid-email',
        defaultMessage: 'Invalid e-mail address!'
    },
    sameEmail: {
        id            : 'app.notification.invalid-email',
        defaultMessage: 'The same email address what you have now!'
    }
});
