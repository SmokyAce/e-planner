import { applyMiddleware, compose, createStore } from 'redux';
import { browserHistory } from 'react-router';

import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise';

import makeRootReducer from './reducers';
import { updateLocation } from './reducers/location';

export default () => {
    // ======================================================
    // Middleware Configuration
    // ======================================================
    const logger = createLogger();

    const middleware = [thunk, logger, promise];

    // ======================================================
    // Store Enhancers
    // ======================================================
    const enhancers = [
        autoRehydrate()
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

    store.asyncReducers = {};

    // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
    store.unsubscribeHistory = browserHistory.listen(updateLocation(store));

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const reducers = require('./reducers').default;

            store.replaceReducer(reducers(store.asyncReducers));
        });
    }

    persistStore(store, {
        blacklist: 'todos, locale, currentUser, location'
    });

    return store;
};
