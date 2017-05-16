
import AccountSettings from './containers/AccountSettings';
import ChangePwd from './containers/ChangePwd';
import ChangeEmail from './containers/ChangeEmail';


// Sync route definition
export const accountSettings = (store) => ({
    component: AccountSettings
});

export const changeEmail = (store) => ({
    path     : 'change-email',
    component: ChangeEmail
});

export const changePwd = (store) => ({
    path     : 'change-pwd',
    component: ChangePwd
});
