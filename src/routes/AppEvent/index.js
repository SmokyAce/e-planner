// import { getAsyncInjectors } from '../../utils/asyncInjectors';
import AppEvent from './components/Event';
import EventHome from '../EventHome';

export default (store) => {
    // const { injectSagas } = getAsyncInjectors(store);
    return ({
        path: 'event/:id',
        getComponent(nextState, next) {
            require.ensure([
                './components/Event'
            ], (require) => {
                next(null, AppEvent);
            });
        },
        indexRoute: EventHome,
        getChildRoutes(location, next) {
            require.ensure([], (require) => {
                next(null, [

                    // Provide store for async reducers and middleware
                    require('../Counter').default(store),
                    require('../Zen').default(store),
                    require('../Todos').default(store)
                ]);
            });
        }
    });
};
