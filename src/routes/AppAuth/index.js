// import { getAsyncInjectors } from '../../utils/asyncInjectors';


export const login = (store) => {
    // const { injectSagas } = getAsyncInjectors(store);

    return ({
        path: 'login',
        getComponent(nextState, next) {
            require.ensure([], (require) => {
                // injectSagas(require('./modules/sagas').default);

                const Login = require('./containers/AuthContainer').default;

                next(null, Login);
            }, 'login');
        }
    });
};

export const verified = (store) => {
    // const { injectSagas } = getAsyncInjectors(store);

    return ({
        path: 'verified',
        getComponent(nextState, next) {
            require.ensure([], (require) => {
                // injectSagas(require('./modules/sagas').default);

                next(null, require('./containers/VerifiedContainer').default);
            }, 'verified');
        }
    });
};
