import AppContainer from './containers/AppContainer';
import { getAsyncInjectors } from '../../utils/asyncInjectors';
import AppHome from '../AppHome';
import auth from '../../utils/auth';


export default (store) => {
    const { injectSagas, injectReducer } = getAsyncInjectors(store);

    return ({
        path: 'app',
        getComponent(nextState, next) {
            require.ensure([], (require) => {
                injectSagas(require('./modules/sagas').default);
                injectReducer('app', require('./modules/app').default);

                next(null, AppContainer);
            }, 'planner');
        },
        indexRoute: AppHome,
        getChildRoutes(location, next) {
            require.ensure([], (require) => {
                next(null, [
                    require('../AppEvent').default(store),

                    require('../UserProfile').default(store)
                ]);
            }, 'planner-routes');
        },
        onEnter: auth.requireAuth
    });
};
