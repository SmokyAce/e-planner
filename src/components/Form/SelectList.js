import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
// components
import { FormattedMessage } from 'react-intl';


class SelectList extends React.Component {
    shouldComponentUpdate = (nextState) => !isEqual(nextState, this.props);

    render() {
        const { input, label, meta: { touched, error }, messages, inline, data, defaultValue } = this.props;
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
                    {data.map(item =>
                        (<option value={item.key} key={item.key}>
                            {item.value}
                        </option>)
                    )}
                </select>
            </div>
        );
    }
}

SelectList.propTypes = {
    input       : PropTypes.object,
    label       : PropTypes.string,
    meta        : PropTypes.object,
    messages    : PropTypes.object,
    inline      : PropTypes.bool,
    data        : PropTypes.array,
    defaultValue: PropTypes.string
};

export default SelectList;
