/*
 *
 * LanguageToggle
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { NavDropdown, MenuItem } from 'react-bootstrap';

// import Toggle from 'components/Toggle';
import messages from './messages';
import { appLocales } from '../../i18n';
import { changeLocale } from '../LanguageProvider/module';
import { selectLocale } from '../LanguageProvider/selectors';


export class LocaleToggle extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <NavDropdown eventKey='1' title={messages[this.props.locale].defaultMessage} id='lang-dropdown'
                onSelect={this.props.onLocaleToggle}
            >
                { appLocales.map(lang =>
                    <MenuItem disabled={lang === this.props.locale} eventKey={lang} key={lang}>
                        {messages[lang].defaultMessage}
                    </MenuItem>
                )}
            </NavDropdown>
        );
    }
}

LocaleToggle.propTypes = {
    onLocaleToggle: React.PropTypes.func,
    locale        : React.PropTypes.string
};

const mapStateToProps = createSelector(
    selectLocale(),
    (locale) => ({ locale })
);

export function mapDispatchToProps(dispatch) {
    return {
        onLocaleToggle: (locale) => dispatch(changeLocale(locale)),
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocaleToggle);
