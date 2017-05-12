// We only need to import the modules necessary for initial render
import { getAsyncInjectors } from '../utils/asyncInjectors';
import Home from './Home';


/*  Note: Instead of using JSX, we recommend using react-router
 PlainRoute objects to build route definitions.   */
export const createRoutes = (store) => {
    // create reusable async injectors using getAsyncInjectors factory
    const { injectReducer } = getAsyncInjectors(store);

    return (
    {
        path: '/',
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                injectReducer('auth', require('./AppAuth/modules/auth').default);

                cb(null, require('../layouts/CoreLayout').default);
            }, 'core');
        },
        indexRoute: Home,
        getChildRoutes(location, next) {
            require.ensure([], (require) => {
                next(null, [
                    require('./App').default(store),

                    require('./AppAuth').login(store),
                    require('./AppAuth').register(store)
                    // require('./AppAuth/Login').default(store),
                    // require('./AppAuth/ResetPwd').default(store)
                ]);
            }, 'core-routes');
        }
    }
    );
};

export default createRoutes;
