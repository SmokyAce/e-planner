import React from 'react';
import PropTypes from 'prop-types';
// components
import { FormattedMessage } from 'react-intl';


const SelectList = ({ input, label, type, meta: { touched, error }, messages, inline, data, defaultValue }) => {
    const inlineForm = inline ? 'form-inline' : '';
    const hasWarning = (touched && error !== undefined) ? 'has-warning' : '';

    return (
        <div className={`form-group ${hasWarning} ${inlineForm}`}>
            <label className='control-label' id='label'>
                <FormattedMessage {...messages[label]} />
            </label>
            <select
                {...input}
                className='form-control'
                name={`select ${label}`}
                value={input.value === '' ? defaultValue : input.value}
            >
                {data.map(dataOption =>
                    (<option value={dataOption} key={dataOption}>
                        {messages[dataOption].defaultMessage}
                    </option>)
                )}
            </select>
        </div>
    );
};


SelectList.propTypes = {
    input       : PropTypes.object,
    label       : PropTypes.string,
    type        : PropTypes.string,
    meta        : PropTypes.object,
    messages    : PropTypes.object,
    inline      : PropTypes.bool,
    data        : PropTypes.array,
    defaultValue: PropTypes.string
};

export default SelectList;
