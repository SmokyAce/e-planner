import React from 'react';
import PropTypes from 'prop-types';
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
    isChecked: PropTypes.bool.isRequired,
    value    : PropTypes.string.isRequired,
    messages : PropTypes.object.isRequired,
    onChange : PropTypes.func.isRequired
};

export default Checkbox;

