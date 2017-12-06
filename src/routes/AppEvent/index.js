import { getAsyncInjectors } from '../../utils/asyncInjectors';

import EventHome from '../EventHome';

export default store => {
    const { injectSagas } = getAsyncInjectors(store);

    return {
        path: 'event/:id(/:service)',
        getComponent(nextState, next) {
            require.ensure(
                [],
                require => {
                    // injectReducer('app.tasks', require('./modules/tasks').default);
                    injectSagas(require('./modules/sagas').default);

                    next(null, require('./containers/EventContainer').default);
                },
                'event'
            );
        },
        indexRoute: EventHome
    };
};
