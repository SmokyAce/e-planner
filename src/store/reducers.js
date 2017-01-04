import { combineReducers } from 'redux';
import locationReducer from './location';
import { localeReducer } from './locales';

export const makeRootReducer = (asyncReducers) => {
    return combineReducers({
        location: locationReducer,
        locale: localeReducer,
        ...asyncReducers
    });
};

export const injectReducer = (store, { key, reducer }) => {
    if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

    store.asyncReducers[key] = reducer;
    store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
