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
            {appLocales.map(item =>
                (<MenuItem disabled={item.key === locale} eventKey={item.key} key={item.key}>
                    {item.value}
                </MenuItem>)
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
