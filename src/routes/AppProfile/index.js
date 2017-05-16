// components
import ProfileLayout from './components/ProfileLayout';
// routes
import { accountSettings, changeEmail, changePwd } from '../ProfileGeneralSettings';


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
