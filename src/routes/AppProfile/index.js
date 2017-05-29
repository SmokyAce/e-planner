// components
import ProfileLayout from './containers/ProfileLayout';
// routes
import accountSettings from '../ProfileGeneralSettings/AccountSettings';
import changeEmail from '../ProfileGeneralSettings/ChangeEmail';
import changePwd from '../ProfileGeneralSettings/ChangePwd';


// Sync route definition
export default (store) => {
    return ({
        path       : 'profile',
        component  : ProfileLayout,
        indexRoute : accountSettings(store),
        childRoutes: [
            changeEmail(store),
            changePwd(store)
        ]
    });
};
