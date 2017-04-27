import { getAsyncInjectors } from '../../utils/asyncInjectors';

export const login = (store) => {
    const { injectSagas } = getAsyncInjectors(store);

    return ({
        path: 'login',
        getComponent(nextState, next) {
            require.ensure([], (require) => {
                injectSagas(require('./modules/sagas').default);

                const Login = require('./containers/LoginHOC').default;

                next(null, Login);
            }, 'login');
        }
    });
};

export const register = (store) => {
    const { injectSagas } = getAsyncInjectors(store);

    return ({
        path: 'register',
        getComponent(nextState, next) {
            require.ensure([], (require) => {
                injectSagas(require('./modules/sagas').default);

                const Register = require('./containers/RegisterHOC').default;

                next(null, Register);
            }, 'register');
        }
    });
};
