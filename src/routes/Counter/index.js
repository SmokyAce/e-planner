import { getAsyncInjectors } from '../../utils/asyncInjectors';

export default (store) => {
    const { injectSagas } = getAsyncInjectors(store);

    return ({
        path: 'counter',
        /*  Async getComponent is only invoked when route matches   */
        getComponent(nextState, cb) {
            /*  Webpack - use 'require.ensure' to create a split point
             and embed an async module loader (jsonp) when bundling   */
            require.ensure([], (require) => {
                /*  Webpack - use require callback to define
                 dependencies for bundling   */
                const Counter = require('./containers/CounterContainer').default;

                injectSagas(require('./modules/sagas').default);

                /*  Return getComponent   */
                cb(null, Counter);

                /* Webpack named bundle   */
            }, 'counter');
        }
    });
};
