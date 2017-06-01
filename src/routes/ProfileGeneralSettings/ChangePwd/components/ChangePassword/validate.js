const validate = (values) => {
    // IMPORTANT: values is an Immutable.Map here!
    const errors = {};

    if (!values.get('newPwd') && values.get('repeatPwd')) {
        errors.newPwd = 'required';
    } else if (!values.get('repeatPwd') && values.get('newPwd')) {
        errors.repeatPwd = 'required';
    } else if (values.get('newPwd') !== values.get('repeatPwd')) {
        errors.repeatPwd = 'notEquals';
    }
    return errors;
};

export default validate;
