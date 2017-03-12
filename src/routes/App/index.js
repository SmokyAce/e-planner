import AppContainer from './containers/AppContainer';
import { getAsyncInjectors } from '../../utils/asyncInjectors';
import AppHome from '../AppHome';

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

                    // Pages
                    //require('../Pages/Register').default(store),
                    //require('../Pages/Login').default(store),
                    //require('../Pages/ResetPwd').default(store),
                    //require('../Pages/Profile').default(store),
                    //require('../Pages/Logout').default(store)
                ]);
            });
        }
    });
};
