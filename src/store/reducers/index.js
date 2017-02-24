import { combineReducers } from 'redux-immutable';
import { location } from './location';
import { locale } from './locales';
import { firebaseUser } from './user';

export const makeRootReducer = (asyncReducers) => {
    return combineReducers({
        location,
        locale,
        currentUser: firebaseUser,
        ...asyncReducers
    });
};

export const injectReducer = (store, { key, reducer }) => {
    if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

    store.asyncReducers[key] = reducer;
    store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
