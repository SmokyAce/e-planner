// We only need to import the modules necessary for initial render
import { getAsyncInjectors } from '../utils/asyncInjectors';

import PlannerCoreLayout from '../layouts/PlannerCoreLayout';
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
            require.ensure(['../layouts/PlannerCoreLayout/modules/sidebar'], (require) => {
                const sidebar = require('../layouts/PlannerCoreLayout/modules/sidebar').default;

                injectReducer('sidebar', sidebar);

                cb(null, PlannerCoreLayout);
            });
        },
        indexRoute: Home,
        getChildRoutes(location, next) {
            require.ensure([], (require) => {
                next(null, [
                        // Provide store for async reducers and middleware
                    require('./Counter').default(store),
                    require('./Zen').default(store),
                    require('./Todos').default(store),
                    require('./User').default(store),
                    require('./Planner').default(store)
                ]);
            });
        }
    }
    );
};

export default createRoutes;
