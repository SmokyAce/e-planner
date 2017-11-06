import { conformsTo, isEmpty, isFunction, isObject, isString } from 'lodash';
import createReducer from '../store/reducers';
// TODO: Реализовать собственный обработчик ошибок
import invariant from 'invariant';
import warning from 'warning';

/**
 * Validate the shape of redux store
 */
export function checkStore(store) {
    const shape = {
        dispatch      : isFunction,
        subscribe     : isFunction,
        getState      : isFunction,
        replaceReducer: isFunction,
        runSaga       : isFunction,
        asyncReducers : isObject
    };

    invariant(conformsTo(store, shape), '(app/utils...) asyncInjectors: Expected a valid redux store');
}

const replaceAsyncReducers = (rootReducers, keys, reducer) => {
    const key = keys.shift();

    if (keys.length === 0) {
        rootReducers[key] = reducer;
        return;
    }
    if (rootReducers[key] === undefined) {
        rootReducers[key] = {};
    }
    const nextRootReducers = rootReducers[key];

    return replaceAsyncReducers(nextRootReducers, keys, reducer);
};

/**
 * Inject an asynchronously loaded reducer
 */
export function injectAsyncReducer(store, isValid) {
    return function injectReducer(key, asyncReducer) {
        if (!isValid) checkStore(store);

        invariant(
            isString(key) && !isEmpty(key) && isFunction(asyncReducer),
            '(app/utils...) injectAsyncReducer: Expected `asyncReducer` to be a reducer function'
        );

        if (Reflect.has(store.asyncReducers, key)) return;

        const keys = key.split('.');

        replaceAsyncReducers(store.asyncReducers, keys, asyncReducer);
        store.replaceReducer(createReducer(store.asyncReducers));
    };
}

/**
 * Inject an asynchronously loaded saga
 */
export function injectAsyncSagas(store, isValid) {
    return function injectSagas(sagas) {
        if (!isValid) checkStore(store);

        invariant(
            Array.isArray(sagas),
            '(app/utils...) injectAsyncSagas: Expected `sagas` to be an array of generator functions'
        );

        warning(!isEmpty(sagas), '(app/utils...) injectAsyncSagas: Received an empty `sagas` array');

        sagas.forEach(saga => {
            if (!(saga.isDaemon === true && Reflect.has(store.asyncSagas, saga))) {
                store.asyncSagas[saga] = true; // eslint-disable-line no-param-reassign
                store.runSaga(saga);
            }
        });
    };
}

/**
 * Helper for creating injectors
 */
export function getAsyncInjectors(store) {
    checkStore(store);

    return {
        injectReducer: injectAsyncReducer(store, true),
        injectSagas  : injectAsyncSagas(store, true)
    };
}
