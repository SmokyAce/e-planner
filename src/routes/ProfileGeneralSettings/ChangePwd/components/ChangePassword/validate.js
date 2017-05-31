const validate = (values) => {
    // IMPORTANT: values is an Immutable.Map here!
    const errors = {};

    if (!values.get('newPwd') && values.get('repeatPwd')) {
        errors.newPwd = 'Required';
    } else if (!values.get('repeatPwd') && values.get('newPwd')) {
        errors.repeatPwd = 'Required';
    } else if (values.get('newPwd') !== values.get('repeatPwd')) {
        errors.repeatPwd = 'new and repeat passwords must be equals!';
    }
    return errors;
};

export default validate;
