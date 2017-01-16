import { RUSSIAN_TRANSLATION } from '../../i18n/messages/ru';
import { ENGLISH_TRANSLATION } from '../../i18n/messages/en';
import { languages } from '../../i18n/langs';

// ------------------------------------
// Constants
// ------------------------------------
export const LOCALE_SELECTED = 'LOCALE_SELECTED';


const initialState = {
    lang    : ENGLISH_TRANSLATION.lang,
    messages: ENGLISH_TRANSLATION.messages,
    languages
};

export const locale = (state = initialState, action) => {
    switch (action.type) {
        case LOCALE_SELECTED:
            switch (action.locale) {
                case 'en':
                    return { ...initialState,
                        lang    : ENGLISH_TRANSLATION.lang,
                        messages: ENGLISH_TRANSLATION.messages,
                        languages };
                case 'ru':
                    return { ...initialState,
                        lang    : RUSSIAN_TRANSLATION.lang,
                        messages: RUSSIAN_TRANSLATION.messages,
                        languages };
                default:
                    return { ...initialState,
                        lang    : ENGLISH_TRANSLATION.lang,
                        messages: ENGLISH_TRANSLATION.messages,
                        languages };
            }
        default:
            return state;
    }
};
