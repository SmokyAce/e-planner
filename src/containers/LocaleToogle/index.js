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

export class LocaleToggle extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <NavDropdown eventKey='1' title={messages.language} id='lang-dropdown'
                onSelect={this.props.onLocaleToggle}
            >
                { appLocales.map(item =>
                    <MenuItem disabled={item.lang === this.props.language} eventKey={item.lang} key={item.lang}>
                        {item.fullName}
                    </MenuItem>
                )}
            </NavDropdown>
        );
    }
}

LocaleToggle.propTypes = {
    onLocaleToggle: React.PropTypes.func,
    language      : React.PropTypes.string
};

const mapStateToProps = createSelector(
    selectLocale(),
    (locale) => ({ locale })
);

export function mapDispatchToProps(dispatch) {
    return {
        onLocaleToggle: (evt) => dispatch(changeLocale(evt.target.value)),
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocaleToggle);
