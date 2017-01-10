import { combineReducers } from 'redux';
import { location } from './location';
import { locale } from './locales';
import { status } from './status';

export const makeRootReducer = (asyncReducers) => {
    return combineReducers({
        location,
        locale,
        status,
        ...asyncReducers
    });
};

export const injectReducer = (store, { key, reducer }) => {
    if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

    store.asyncReducers[key] = reducer;
    store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
