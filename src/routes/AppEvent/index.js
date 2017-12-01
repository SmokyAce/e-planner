import { getAsyncInjectors } from '../../utils/asyncInjectors';

import EventHome from '../EventHome';

export default store => {
    const { injectReducer } = getAsyncInjectors(store);

    return {
        path: 'event/:id(/:service)',
        getComponent(nextState, next) {
            require.ensure(
                [],
                require => {
                    // injectReducer('app.todos', require('../Todos/modules/todos').default);
                    injectReducer('app.tasks', require('./modules/tasks').default);

                    next(null, require('./containers/EventContainer').default);
                },
                'event'
            );
        },
        indexRoute: EventHome
    };
};
