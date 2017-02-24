import { combineReducers } from 'redux';
import { location } from './location';
import languageProviderReducer from '../../containers/LanguageProvider/module';
import { status } from './status';
import { firebaseUser } from './user';

export const makeRootReducer = (asyncReducers) => {
    return combineReducers({
        location,
        language   : languageProviderReducer,
        status,
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
