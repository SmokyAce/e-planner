import { applyMiddleware, compose, createStore } from 'redux';
import { browserHistory } from 'react-router';
import { Iterable } from 'immutable';
// reducers
import makeRootReducer from './reducers';
import { updateLocation } from './reducers/location';
// middlewares
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import authSaga from './authSaga';

const stateTransformer = (state) => {
    if (Iterable.isIterable(state)) return state.toJS();
    return state;
};
const logger = createLogger({
    stateTransformer
});
const sagaMiddleware = createSagaMiddleware();

export default (initialState = {}) => {
    // ======================================================
    // Middleware Configuration
    // ======================================================
    const middleware = [sagaMiddleware];

    if (__DEV__) {
        middleware.push(logger);
    }
    // ======================================================
    // Store Enhancers
    // ======================================================
    const enhancers = [
        // autoRehydrate()
    ];

    let composeEnhancers = compose;

    if (__DEV__) {
        const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

        if (typeof composeWithDevToolsExtension === 'function') {
            composeEnhancers = composeWithDevToolsExtension;
        }
    }

    // ======================================================
    // Store Instantiation and HMR Setup
    // ======================================================
    const store = createStore(
        makeRootReducer(),
        composeEnhancers(
            applyMiddleware(...middleware),
            ...enhancers
        )
    );

    // Extensions
    store.runSaga = sagaMiddleware.run;
    store.runSaga(authSaga);

    store.asyncReducers = {};
    store.asyncSagas = {};

    // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
    store.unsubscribeHistory = browserHistory.listen(updateLocation(store));

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const reducers = require('./reducers').default;

            store.replaceReducer(reducers(store.asyncReducers));
        });
    }

    return store;
};
