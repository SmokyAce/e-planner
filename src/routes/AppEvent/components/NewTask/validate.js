const validate = (values, props) => {
    // IMPORTANT: values is an Immutable.Map here!
    const errors = {};

    if (!values.get('description')) {
        errors.email = 'required';
    }
    return errors;
};

export default validate;
