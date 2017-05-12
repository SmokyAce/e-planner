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
                // injectReducer('app.users', require('./modules/users').default);
                // injectReducer('app.sidebar', require('./modules/sidebar').default);
                // injectReducer('app.events', require('./modules/events').default);

                next(null, AppContainer);
            }, 'planner');
        },
        indexRoute: AppHome,
        getChildRoutes(location, next) {
            require.ensure([], (require) => {
                next(null, [
                    require('../AppEvent').default(store),

                    require('../UserProfile').default(store)
                    // require('../Counter').default(store),
                    // require('../Zen').default(store),
                    // require('../Todos').default(store)
                ]);
            }, 'planner-routes');
        },
        onEnter: auth.requireAuth
    });
};
