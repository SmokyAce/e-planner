import React from 'react';


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
    isChecked : React.PropTypes.bool.isRequired,
    value     : React.PropTypes.string.isRequired,
    name      : React.PropTypes.string.isRequired,
    filterName: React.PropTypes.string.isRequired,
    onChange  : React.PropTypes.func.isRequired
};

export default RadioButton;

