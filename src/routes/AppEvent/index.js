import { getAsyncInjectors } from '../../utils/asyncInjectors';

import EventHome from '../EventHome';

export default store => {
    const { injectReducer } = getAsyncInjectors(store);

    return {
        path: 'event/:id',
        getComponent(nextState, next) {
            require.ensure(
                [],
                require => {
                    injectReducer('app.todos', require('../Todos/modules/todos').default);

                    next(null, require('./containers/EventContainer').default);
                },
                'event'
            );
        },
        indexRoute: EventHome,
        getChildRoutes(location, next) {
            require.ensure(
                [],
                require => {
                    next(null, [
                        // require('../Zen').default(store),
                        require('../EventCounter').default(store),
                        require('../Todos').default(store),
                        require('../EventBlog').default(store),
                        require('../EventBudget').default(store),
                        require('../EventContractors').default(store),
                        require('../EventGuests').default(store),
                        require('../EventNotebook').default(store),
                        require('../EventQuiz').default(store),
                        require('../EventTiming').default(store),
                        require('../EventSettings').default(store),
                        require('../EventRemove').default(store)
                    ]);
                },
                'event-routes'
            );
        }
    };
};
