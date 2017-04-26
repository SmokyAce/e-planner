import { getAsyncInjectors } from '../../utils/asyncInjectors';

export default (store) => {
    const { injectReducer } = getAsyncInjectors(store);

    return ({
        path: 'zen',
        getComponent(nextState, next) {
            require.ensure([], (require) => {
                injectReducer('zen', require('./modules/zen').default);

                next(null, require('./containers/ZenContainer').default);
            }, 'zen');
        }
    });
};
