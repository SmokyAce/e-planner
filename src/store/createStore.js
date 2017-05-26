import { applyMiddleware, compose, createStore } from 'redux';
import { browserHistory } from 'react-router';
import { fromJS, Iterable } from 'immutable';

import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import makeRootReducer from './reducers';
import { updateLocation } from './reducers/location';

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
        fromJS(initialState),
        composeEnhancers(
            applyMiddleware(...middleware),
            ...enhancers
        )
    );

    // Extensions
    store.runSaga = sagaMiddleware.run;
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
