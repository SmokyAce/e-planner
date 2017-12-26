const UPDATE_THEME = 'theme/UPDATE_THEME';

export const updateTheme = theme => ({
    type: UPDATE_THEME,
    theme
});

export default function themeReducer(state = 'light', action) {
    return action.type === UPDATE_THEME ? action.theme : state;
}
