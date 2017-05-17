import React from 'react';
import PropTypes from 'prop-types';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import messages from './messages';
import { appLocales } from '../../i18n';


/*
 * LanguageToggle
 */
const LocaleToggle = ({ locale, onLocaleToggle, className }) => {
    return (
        <NavDropdown eventKey='1' title={messages[locale].defaultMessage} id='lang-dropdown'
            onSelect={onLocaleToggle} className={className}
        >
            { appLocales.map(lang =>
                <MenuItem disabled={lang === locale} eventKey={lang} key={lang}>
                    {messages[lang].defaultMessage}
                </MenuItem>
            )}
        </NavDropdown>
    );
};

LocaleToggle.propTypes = {
    onLocaleToggle: PropTypes.func,
    locale        : PropTypes.string,
    className     : PropTypes.string
};

export default LocaleToggle;
