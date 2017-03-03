import Planner from './containers/PlannerContainer';
import { getAsyncInjectors } from '../../utils/asyncInjectors';
import PlannerHome from '../PlannerHome';

export default (store) => {

    const { injectReducer, injectSagas } = getAsyncInjectors(store);

    return ({
        path: 'planner',
        getComponent(nextState, next) {
            require.ensure([
                './containers/PlannerContainer',
                './modules/user'
            ], (require) => {

                // user reducers
                injectReducer('currentUser', require('./modules/user').default);
                injectSagas(require('./modules/sagas').default);

                next(null, Planner);
            });
        },
        indexRoute: PlannerHome,
        getChildRoutes(location, next) {
            require.ensure([], (require) => {
                next(null, [
                    // Provide store for async reducers and middleware
                    require('../Users').default(store),

                ]);
            });
        },
    });
}
