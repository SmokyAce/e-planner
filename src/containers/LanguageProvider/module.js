import { fromJS } from 'immutable';
import { REHYDRATE } from 'redux-persist/constants';


// ------------------------------------
// Constants
// ------------------------------------
export const CHANGE_LOCALE = 'CHANGE_LOCALE';
export const DEFAULT_LOCALE = 'en';

// ------------------------------------
// Actions
// ------------------------------------
export const changeLocale = (languageLocale) => ({
    type  : CHANGE_LOCALE,
    locale: languageLocale
});

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({ locale: DEFAULT_LOCALE });

const languageProviderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LOCALE:
            return state
                .set('locale', action.locale);
        case REHYDRATE: {
            const incoming = action.payload.language;

            if (incoming) {
                return state.set('locale', incoming.get('locale'));
            }
            return state;
        }
        default:
            return state;
    }
};

export default languageProviderReducer;
