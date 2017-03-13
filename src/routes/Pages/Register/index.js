import Register from './Register';
import { getAsyncInjectors } from '../../../utils/asyncInjectors';


// Sync route definition
export default (store) => {
    const { injectSagas } = getAsyncInjectors(store);

    return ({
        path: 'register',
        getComponent(nextState, next) {
            require.ensure([], (require) => {
                injectSagas(require('./sagas').default);
                next(null, Register);
            });
        }
    });
};
