import auth from '../../utils/auth';
import { getAsyncInjectors } from '../../utils/asyncInjectors';


// Sync route definition
export default (store) => {
    const { injectSagas } = getAsyncInjectors(store);

    return ({
        path: 'profile',
        getComponent(nextState, next) {
            require.ensure([
                './Profile'
            ], (require) => {
                injectSagas(require('./sagas').default);
                next(null, require('./Profile').default);
            });
        },
        onEnter: auth.requireAuth
    });
};
