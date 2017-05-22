import { combineReducers } from 'redux-immutable';
import { location } from './location';
import language from '../../containers/LanguageProvider/module';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';


export const makeRootReducer = (asyncReducers) => {
    const newAsyncReducers = {};

    for (const key in asyncReducers) {
        if (!asyncReducers.hasOwnProperty(key)) continue;
        newAsyncReducers[key] = combineAsyncReducers(asyncReducers[key]);
    }
    return combineAsyncReducers({
        location,
        language,
        loadingBar,
        ...asyncReducers
    });
};

export default makeRootReducer;

const combineAsyncReducers = (asyncReducers) => {
    if (typeof asyncReducers !== 'object') return asyncReducers;
    const combineReducerObject = {};

    for (const prop in asyncReducers) {
        if (!asyncReducers.hasOwnProperty(prop)) continue;
        const value = asyncReducers[prop];

        if (typeof value === 'object') {
            combineReducerObject[prop] = combineAsyncReducers(value);
        } else if (typeof value === 'function') {
            combineReducerObject[prop] = value;
        }
    }
    return combineReducers(combineReducerObject);
};
