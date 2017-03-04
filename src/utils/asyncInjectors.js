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

    invariant(
        conformsTo(store, shape),
        '(app/utils...) asyncInjectors: Expected a valid redux store'
    );
}

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

        store.asyncReducers[key] = asyncReducer; // eslint-disable-line no-param-reassign
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

        warning(
            !isEmpty(sagas),
            '(app/utils...) injectAsyncSagas: Received an empty `sagas` array'
        );

        sagas.map(store.runSaga);
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
