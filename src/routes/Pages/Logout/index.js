import Logout from './Logout';

// Sync route definition
export default (store) =>  {
    return ({
        path     : 'logout',
        component: Logout
    })
};
