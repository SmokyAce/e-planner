import React from 'react';
import { FormattedMessage } from 'react-intl';


const Checkbox = ({ isChecked, value, onChange, messages }) => {
    const onCheckboxSelect = (event) => {
        onChange(event.target.value);
    };

    return (
        <div className='checkbox-inline'>
            <label>
                <input type='checkbox' value={value} checked={isChecked}
                    onChange={onCheckboxSelect}
                />
                <FormattedMessage {...messages[value]} />
            </label>
        </div>
    );
};

Checkbox.propTypes = {
    isChecked: React.PropTypes.bool.isRequired,
    value    : React.PropTypes.string.isRequired,
    messages : React.PropTypes.object.isRequired,
    onChange : React.PropTypes.func.isRequired
};

export default Checkbox;

