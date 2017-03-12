// We only need to import the modules necessary for initial render
import { getAsyncInjectors } from '../utils/asyncInjectors';

import CoreLayout from '../layouts/CoreLayout';
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
                injectReducer('app', require('./App/modules/app').default);

                cb(null, CoreLayout);
            });
        },
        indexRoute: Home,
        getChildRoutes(location, next) {
            require.ensure([], (require) => {
                next(null, [
                    require('./App').default(store),

                    require('./Pages/Register').default(store),
                    require('./Pages/Login').default(store),
                    require('./Pages/ResetPwd').default(store),
                    require('./Pages/Profile').default(store),

                    // Provide store for async reducers and middleware
                    require('./Counter').default(store),
                    require('./Zen').default(store),
                    require('./Todos').default(store)
                ]);
            });
        }
    }
    );
};

export default createRoutes;
