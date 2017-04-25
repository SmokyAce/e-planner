import { getAsyncInjectors } from '../../../utils/asyncInjectors';


// Sync route definition
export default (store) => {
    const { injectSagas } = getAsyncInjectors(store);

    return ({
        path: 'register',
        getComponent(nextState, next) {
            require.ensure([], (require) => {
                injectSagas(require('./sagas').default);
                const Register = require('./Register').default;

                next(null, Register);
            }, 'register');
        }
    });
};
