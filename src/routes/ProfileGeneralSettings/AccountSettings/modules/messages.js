/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
    description: {
        id            : 'app.account-settings.description',
        defaultMessage: 'Account settings'
    },
    email: {
        id            : 'app.email',
        defaultMessage: 'Email'
    },
    update_btn: {
        id            : 'app.profile.save-btn',
        defaultMessage: 'Save'
    },
    displayName: {
        id            : 'app.profile.display-name',
        defaultMessage: 'Display name:'
    },
    sex: {
        id            : 'app.profile.sex',
        defaultMessage: 'Sex:'
    },
    male: {
        id            : 'app.profile.sex-male',
        defaultMessage: 'Male'
    },
    female: {
        id            : 'app.profile.sex-female',
        defaultMessage: 'Female'
    },
    language: {
        id            : 'app.language',
        defaultMessage: 'Language:'
    },
    en: {
        id            : 'app.language.en',
        defaultMessage: 'English'
    },
    ru: {
        id            : 'app.language.ru',
        defaultMessage: 'Русский'
    }
});
