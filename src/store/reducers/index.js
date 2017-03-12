import { combineReducers } from 'redux-immutable';
import { location } from './location';
import languageProviderReducer from '../../containers/LanguageProvider/module';


export const makeRootReducer = (asyncReducers) => {
    return combineReducers({
        location,
        language: languageProviderReducer,
        // currentUser: firebaseUser,
        ...asyncReducers
    });
};

export default makeRootReducer;
