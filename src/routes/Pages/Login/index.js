import Login from './Login';
import { getAsyncInjectors } from '../../../utils/asyncInjectors';

export default (store) => {
    const { injectSagas } = getAsyncInjectors(store);

    return ({
        path     : 'login',
        getComponent(nextState, next) {
            require.ensure([], (require) => {
                injectSagas(require('./sagas').default);
                next(null, Login);
            });
        },
    });
};
