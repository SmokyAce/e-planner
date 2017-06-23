import React from 'react';
import PropTypes from 'prop-types';
import { appLocales } from '../../i18n';
import DropdownMenu from './DropdownMenuMUI';


/*
 * LanguageToggle
 */
const LocaleToggle = ({ locale, onLocaleToggle, className, style }) => {
    return (
        <DropdownMenu
            onChange={onLocaleToggle}
            className={className}
            data={appLocales}
            defaultValue={locale}
            style={style}
        />
    );
};

LocaleToggle.propTypes = {
    onLocaleToggle: PropTypes.func,
    locale        : PropTypes.string,
    className     : PropTypes.string,
    style         : PropTypes.object
};

export default LocaleToggle;
