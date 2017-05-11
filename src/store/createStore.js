import { applyMiddleware, compose, createStore } from 'redux';
import { browserHistory } from 'react-router';
import { fromJS } from 'immutable';
import { persistStore, autoRehydrate } from 'redux-persist-immutable';
import localForage from 'localforage';

import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import makeRootReducer from './reducers';
import { updateLocation } from './reducers/location';

const logger = createLogger();
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

    // Restore the state from localStorage
    const config = {
        whitelist: ['app', 'language'],
        blacklist: ['auth', 'location'],
        storage  : localForage,
        keyPrefix: 'e-planner:'
    };

    // initialState = await getStoredState(config);
    // if (typeof initialState === 'object') {
    //     initialState = fromJS(initialState);
    // }

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

    // Persist store
    persistStore(store, config);

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
