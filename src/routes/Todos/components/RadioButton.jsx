import React from 'react';
import PropTypes from 'prop-types';


const RadioButton = ({ isChecked, value, name, onChange, filterName }) => {
    const onRadioSelect = (event) => {
        onChange(event.target.value);
    };

    return (
        <div className='radio-inline'>
            <label>
                <input type='radio' value={value} checked={isChecked} key={value} name={name}
                    onChange={onRadioSelect}
                />
                <strong>{filterName}</strong>
            </label>
        </div>
    );
};

RadioButton.propTypes = {
    isChecked : PropTypes.bool.isRequired,
    value     : PropTypes.string.isRequired,
    name      : PropTypes.string.isRequired,
    filterName: PropTypes.string.isRequired,
    onChange  : PropTypes.func.isRequired
};

export default RadioButton;

