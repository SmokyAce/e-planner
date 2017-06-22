import React from 'react';
import PropTypes from 'prop-types';

// Material-UI
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


class DropDownMenuMUI extends React.Component {

    handleChange = (event, index, value) => this.props.onChange(value);

    static muiName = 'DropDownMenu';

    render() {
        const { defaultValue, data, style } = this.props;

        return (
            <DropDownMenu value={defaultValue} onChange={this.handleChange} labelStyle={style}>
                {data.map(item =>
                    (<MenuItem key={item.key} value={item.key} primaryText={item.value} />)
                )}
            </DropDownMenu>
        );
    }
}

DropDownMenuMUI.propTypes = {
    data        : PropTypes.array,
    defaultValue: PropTypes.string,
    onChange    : PropTypes.func,
    style       : PropTypes.object
};

export default DropDownMenuMUI;
