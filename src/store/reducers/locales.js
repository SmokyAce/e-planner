import { RUSSIAN_TRANSLATION } from '../../i18n/messages/ru';
import { ENGLISH_TRANSLATION } from '../../i18n/messages/en';
import { languages } from '../../i18n/langs';
import { fromJS, Map, List } from 'immutable';

// ------------------------------------
// Constants
// ------------------------------------
export const LOCALE_SELECTED = 'LOCALE_SELECTED';


const initialState = fromJS({
    lang    : ENGLISH_TRANSLATION.lang,
    messages: ENGLISH_TRANSLATION.messages,
    languages
});

export const locale = (state = initialState, action) => {
    switch (action.type) {
        case LOCALE_SELECTED:
            switch (action.locale) {
                case 'en':
                    return state.set('lang', ENGLISH_TRANSLATION.lang)
                                .set('messages', Map(ENGLISH_TRANSLATION.messages))
                                .set('languages', List(languages));
                case 'ru':
                    return state.set('lang', RUSSIAN_TRANSLATION.lang)
                        .set('messages', Map(RUSSIAN_TRANSLATION.messages))
                        .set('languages', List(languages));
                default:
                    return state.set('lang', ENGLISH_TRANSLATION.lang)
                        .set('messages', Map(ENGLISH_TRANSLATION.messages))
                        .set('languages', List(languages));
            }
        default:
            return state;
    }
};
