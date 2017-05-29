const validate = (values, props) => {
    // IMPORTANT: values is an Immutable.Map here!
    const errors = {};

    if (!values.get('email')) {
        errors.email = 'Required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))
    ) {
        errors.email = 'Invalid email address';
    } else if (props.currentEmail === values.get('email')) {
        errors._error = 'The same email address that you have';
    }
    return errors;
};

export default validate;
