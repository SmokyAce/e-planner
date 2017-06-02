import React from 'react';
import PropTypes from 'prop-types';
// components
import { FormattedMessage } from 'react-intl';
import Warning from '../Indicators/Warning';


const ExtendField = ({ input, label, type, meta: { touched, error }, messages }) => (
    <div className={`form-group ${(touched && error !== undefined) ? 'has-warning' : ''}`}>
        <label className='control-label'>
            <FormattedMessage {...messages[label]} />
        </label>
        <input className='form-control' {...input} type={type} />
        {touched && error && (<Warning message={messages[error]} />)}
    </div>
);

ExtendField.propTypes = {
    input   : PropTypes.object,
    label   : PropTypes.string,
    type    : PropTypes.string,
    meta    : PropTypes.object,
    messages: PropTypes.object
};
