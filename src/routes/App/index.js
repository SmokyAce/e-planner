import AppContainer from './containers/AppContainer';
import { getAsyncInjectors } from '../../utils/asyncInjectors';
import AppHome from '../AppHome';
import auth from '../../utils/auth';

export default (store) => {
    const { injectSagas } = getAsyncInjectors(store);

    return ({
        path: 'app',
        getComponent(nextState, next) {
            require.ensure([
                './containers/AppContainer',
                './modules/sagas'
            ], (require) => {
                injectSagas(require('./modules/sagas').default);
                next(null, AppContainer);
            });
        },
        indexRoute: AppHome,
        getChildRoutes(location, next) {
            require.ensure([], (require) => {
                next(null, [
                    require('../AppEvent').default(store)

                    // Provide store for async reducers and middleware
                    // require('../Counter').default(store),
                    // require('../Zen').default(store),
                    // require('../Todos').default(store)
                ]);
            });
        },
        onEnter: auth.requireAuth
    });
};
