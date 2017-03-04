import requireAuth from '../../../utils/authenticated';

// Sync route definition
export default (store) => {
    return ({
        path: 'profile',
        getComponent(nextState, next) {
            require.ensure([
                './Profile'
            ], (require) => {
                next(null, require('./Profile').default);
            });
        },
        onEnter: requireAuth
    });
};
