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
                    // require('../Zen').default(store),
                    require('../Counter').default(store),
                    require('../Todos').default(store),
                    require('../EventBlog').default(store),
                    require('../EventBudget').default(store),
                    require('../EventContractors').default(store),
                    require('../EventGuests').default(store),
                    require('../EventNotebook').default(store),
                    require('../EventQuiz').default(store),
                    require('../EventTiming').default(store)
                ]);
            });
        }
    });
};
