import { RUSSIAN_TRANSLATION } from '../i18n/messages/ru';
import { ENGLISH_TRANSLATION } from '../i18n/messages/en';
import { languages } from '../i18n/langs';

const initialState = {
    lang: ENGLISH_TRANSLATION.lang,
    messages: ENGLISH_TRANSLATION.messages,
    languages: languages,
};

export const localeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOCALE_SELECTED':
            switch (action.locale) {
                case 'en':
                    return { ...initialState, lang: ENGLISH_TRANSLATION.lang, messages: ENGLISH_TRANSLATION.messages, languages: languages };
                case 'ru':
                    return { ...initialState, lang: RUSSIAN_TRANSLATION.lang, messages: RUSSIAN_TRANSLATION.messages, languages: languages };
                default:
                    return { ...initialState, lang: ENGLISH_TRANSLATION.lang, messages: ENGLISH_TRANSLATION.messages, languages: languages };
            }
        default:
            return state;
    }
};