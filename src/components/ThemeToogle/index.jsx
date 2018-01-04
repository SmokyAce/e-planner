import React from 'react';
import PropTypes from 'prop-types';
import { themes } from '../../routes/App/components/App/themes';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class ThemeToogle extends React.Component {
    shouldComponentUpdate = nextProps => nextProps.theme !== this.props.theme;

    render() {
        const { theme, updateTheme, style } = this.props;

        return (
            <Menu listStyle={style}>
                {themes.map(item => (
                    <MenuItem
                        primaryText={item.id}
                        key={item.id}
                        disabled={!!(theme === item.id)}
                        onClick={() => {
                            updateTheme(item.id);
                        }}
                    />
                ))}
            </Menu>
        );
    }
}

ThemeToogle.propTypes = {
    updateTheme: PropTypes.func,
    theme      : PropTypes.string,
    style      : PropTypes.object
};

export default ThemeToogle;
