import { getAsyncInjectors } from '../../utils/asyncInjectors';

export default (store) => {
    const { injectReducer } = getAsyncInjectors(store);

    return ({
        path: 'event/:id/zen',
        getComponent(nextState, next) {
            require.ensure([
                './containers/ZenContainer',
                './modules/zen'
            ], (require) => {
                const Zen = require('./containers/ZenContainer').default;
                const zenReducer = require('./modules/zen').default;

                injectReducer('zen', zenReducer);

                next(null, Zen);
            });
        }
    });
};
