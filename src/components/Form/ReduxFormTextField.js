import React from 'react';
import PropTypes from 'prop-types';
// components
import TextField from 'material-ui/TextField';


const ReduxFormTextField = ({ input, label, meta: { touched, error }, formattedError, ...custom, style }) => (
    <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error && formattedError}
        {...input}
        {...custom}
        style={style}
        fullWidth
    />
);

ReduxFormTextField.propTypes = {
    input         : PropTypes.object,
    label         : PropTypes.element,
    type          : PropTypes.string,
    meta          : PropTypes.object,
    messages      : PropTypes.object,
    inline        : PropTypes.bool,
    style         : PropTypes.object,
    formattedError: PropTypes.element
};

export default ReduxFormTextField;
