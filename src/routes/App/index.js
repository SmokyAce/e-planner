import AppContainer from './containers/AppContainer';
import { getAsyncInjectors } from '../../utils/asyncInjectors';
import AppHome from '../AppHome';
import auth from '../../utils/auth';

export default store => {
    const { injectSagas, injectReducer } = getAsyncInjectors(store);

    return {
        path: 'app',
        getComponent(nextState, next) {
            require.ensure(
                [],
                require => {
                    injectSagas(require('./modules/sagas').default);

                    injectReducer('app.connection', require('./modules/connection').default);
                    injectReducer('app.sync', require('./modules/sync').default);
                    injectReducer('app.sidebar', require('./modules/sidebar').default);
                    injectReducer('app.user', require('./modules/user').default);
                    injectReducer('app.events', require('./modules/events').default);
                    injectReducer('app.tasks', require('../AppEvent/modules/tasks').default);

                    next(null, AppContainer);
                },
                'planner'
            );
        },
        indexRoute: AppHome,
        getChildRoutes(location, next) {
            require.ensure(
                [],
                require => {
                    next(null, [
                        require('../AppEvent').default(store),

                        require('../AppSettings').default(store),
                        require('../AppGuests').default(store),
                        require('../AppContractors').default(store)
                    ]);
                }
            );
        },
        onEnter: auth.requireAuth
    };
};
