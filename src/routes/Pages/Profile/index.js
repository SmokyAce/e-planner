import Profile from './Profile';
import requireAuth from '../../../utils/authenticated';

// Sync route definition
export default (store) =>  {
    return ({
        path     : 'profile',
        component: Profile,
        onEnter: requireAuth
    })
};
