import React from 'react';
import PropTypes from 'prop-types';

// Material-UI
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


const styles = {
    labelStyle: {
        color: '#7b8994'
    },
    style: {
        margin: '-10px 0px 0px',
        width : 'auto'
    }
};

class SelectList extends React.Component {
    handleChange = (event, index, value) => this.props.onChange(value);

    static muiName = 'SelectField';

    render() {
        const { defaultValue, data, style } = this.props;

        return (
            <SelectField
                value={defaultValue}
                onChange={this.handleChange}
                labelStyle={styles.labelStyle}
                style={{ ...styles.style, style }}
            >
                {data.map(item =>
                    (<MenuItem key={item.key} value={item.key} primaryText={item.value} />)
                )}
            </SelectField>
        );
    }
}

SelectList.propTypes = {
    data        : PropTypes.array,
    defaultValue: PropTypes.string,
    onChange    : PropTypes.func,
    style       : PropTypes.object
};

export default SelectList;
