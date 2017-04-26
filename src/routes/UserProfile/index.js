import auth from '../../utils/auth';
import { getAsyncInjectors } from '../../utils/asyncInjectors';


// Sync route definition
export default (store) => {
    const { injectSagas } = getAsyncInjectors(store);

    return ({
        path: 'profile',
        getComponent(nextState, next) {
            require.ensure([], (require) => {
                injectSagas(require('./modules/sagas').default);
                next(null, require('./containers/Profile').default);
            }, 'profile');
        },
        onEnter: auth.requireAuth
    });
};
