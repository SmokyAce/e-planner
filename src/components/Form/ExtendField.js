import React from 'react';
import PropTypes from 'prop-types';
// components
import { FormattedMessage } from 'react-intl';
import Warning from '../Indicators/Warning';


const ExtendField = ({ input, label, type, meta: { touched, error }, messages, inline }) => {
    const inlineForm = inline ? 'form-inline' : '';
    const hasWarning = (touched && error !== undefined) ? 'has-warning' : '';

    return (
        <div className={`form-group ${hasWarning} ${inlineForm}`}>
            <label className='control-label' id='label'>
                <FormattedMessage {...messages[label]} />
            </label>
            <input className='form-control' {...input} type={type} />
            {touched && error && (<Warning message={messages[error]} />)}
        </div>
    );
};

ExtendField.propTypes = {
    input   : PropTypes.object,
    label   : PropTypes.string,
    type    : PropTypes.string,
    meta    : PropTypes.object,
    messages: PropTypes.object,
    inline  : PropTypes.bool
};

export default ExtendField;
