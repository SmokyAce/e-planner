import { fromJS } from 'immutable';

// ------------------------------------
// Constants
// ------------------------------------
export const CHANGE_LOCALE = 'CHANGE_LOCALE';
export const DEFAULT_LOCALE = 'en';

// ------------------------------------
// Actions
// ------------------------------------
export function changeLocale(languageLocale) {
    return {
        type  : CHANGE_LOCALE,
        locale: languageLocale
    };
}

const initialState = fromJS({
    locale: DEFAULT_LOCALE
});


// ------------------------------------
// Reducer
// ------------------------------------
function languageProviderReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_LOCALE:
            return state
                .set('locale', action.locale);
        default:
            return state;
    }
}

export default languageProviderReducer;
