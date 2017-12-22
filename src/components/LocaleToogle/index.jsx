import React from 'react';
import PropTypes from 'prop-types';
import { appLocales } from '../../i18n';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import SelectList from '../SelectList';

/*
 * LanguageToggle
 */
const LocaleToggle_ = ({ locale, onLocaleToggle, className, style }) => {
    return (
        <SelectList
            onChange={onLocaleToggle}
            className={className}
            data={appLocales}
            defaultValue={locale}
            style={style}
        />
    );
};

class LocaleToggle extends React.Component {

    shouldComponentUpdate = nextProps => (nextProps.locale !== this.props.locale);

    render() {
        const { locale, onLocaleToggle, className, style } = this.props;

        return (
            <Menu style={style} className={className}>
                {appLocales.map(item => (
                    <MenuItem
                        primaryText={item.value}
                        key={item.key}
                        disabled={!!(locale === item.key)}
                        onClick={() => {
                            onLocaleToggle(item.key);
                        }}
                    />
                ))}
            </Menu>
        );
    }
}

LocaleToggle.propTypes = {
    onLocaleToggle: PropTypes.func,
    locale        : PropTypes.string,
    className     : PropTypes.string,
    style         : PropTypes.object
};

export default LocaleToggle;
