import { getAsyncInjectors } from '../../../utils/asyncInjectors';

export default (store) => {
    const { injectSagas } = getAsyncInjectors(store);

    return ({
        path: 'login',
        getComponent(nextState, next) {
            require.ensure([], (require) => {
                injectSagas(require('./sagas').default);

                const Login = require('./Login_').default;

                next(null, Login);
            }, 'login');
        }
    });
};
