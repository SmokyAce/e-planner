import React from 'react';


const Checkbox = ({ isChecked, value, onChange, key }) => {
    const onCheckboxSelect = (event) => {
        onChange(event.target.value);
    };

    return (
        <div className='checkbox-inline'>
            <label>
                <input type='checkbox' value={value} checked={isChecked} key={key}
                    onChange={onCheckboxSelect}
                />
                {value}
            </label>
        </div>
    );
};

Checkbox.propTypes = {
    isChecked: React.PropTypes.bool.isRequired,
    value    : React.PropTypes.string.isRequired,
    key      : React.PropTypes.string.isRequired,
    onChange : React.PropTypes.func.isRequired
};

export default Checkbox;

