const validate = (values, props) => {
    // IMPORTANT: values is an Immutable.Map here!
    const errors = {};

    if (!values.get('name')) {
        errors.name = 'required';
    } else if (!values.get('date')) {
        errors.date = 'required';
    }
    return errors;
};

export default validate;
