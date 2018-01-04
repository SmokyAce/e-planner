import { REHYDRATE } from 'redux-persist/constants';

const UPDATE_THEME = 'theme/UPDATE_THEME';

export const updateTheme = theme => ({
    type: UPDATE_THEME,
    theme
});

const THEMES_ACTION_HANDLERS = {
    [UPDATE_THEME]: (state, action) => action.theme,
    [REHYDRATE]   : (state, action) => {
        const incoming = action.payload.app;

        if (incoming && incoming.get('theme')) {
            return incoming.get('theme');
        }
        return state;
    }
};

export default function themeReducer(state = 'ics', action) {
    const handler = THEMES_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
