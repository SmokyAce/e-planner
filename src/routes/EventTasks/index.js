// import { getAsyncInjectors } from '../../utils/asyncInjectors';

export default store => {
    // const { injectReducer } = getAsyncInjectors(store);

    return {
        path: 'tasks',
        getComponent(nextState, next) {
            require.ensure(
                [],
                require => {
                    // injectReducer('todos', require('./modules/todos').default);
                    next(null, require('./containers/EventTasksContainer').default);
                },
                'tasks'
            );
        }
    };
};
