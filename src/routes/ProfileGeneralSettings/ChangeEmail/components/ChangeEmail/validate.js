const validate = (values, props) => {
    // IMPORTANT: values is an Immutable.Map here!
    const errors = {};

    if (!values.get('email')) {
        errors.email = 'required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))
    ) {
        errors.email = 'invalidEmail';
    } else if (props.currentEmail === values.get('email')) {
        errors.email = 'sameEmail';
    }
    return errors;
};

export default validate;
