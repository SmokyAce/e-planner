import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
// components
import { Field, reduxForm } from 'redux-form/immutable';
import ReduxFormTextField from '../../../../components/Form/ReduxFormTextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Checkbox from 'material-ui/Checkbox';
// import Services from '../Services';
// import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
// import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
// intl
import messages from './messages';
// validate
import validate from './validate';
// styles
import './CreateEvent.scss';

const services = {
    // counter    : false,
    guests     : true,
    tasks      : true,
    budjet     : true,
    timing     : false,
    contractors: false,
    blog       : false,
    quiz       : false,
    notebook   : false
};

const initialValues = {
    date: new Date(),
    time: new Date()
};

for (const key in services) {
    if (services.hasOwnProperty(key)) {
        initialValues[key] = services[key];
    }
}

const renderTextField = props => {
    const { meta } = props;

    return <ReduxFormTextField {...props} formattedError={<FormattedMessage {...messages[meta.error]} />} />;
};

renderTextField.propTypes = {
    meta: PropTypes.object
};

const renderDateField = ({ input: { onBlur, value, ...inputProps }, meta, onChange, ...props }) => (
    <DatePicker
        {...props}
        floatingLabelText={props.hintText}
        onChange={(event, val) => {
            inputProps.onChange(val);
            if (onChange) {
                onChange(val);
            }
        }}
        value={value}
        textFieldStyle={{ width: 'auto' }}
    />
);

renderDateField.propTypes = {
    input   : PropTypes.object,
    meta    : PropTypes.object,
    hintText: PropTypes.element,
    onChange: PropTypes.func
};

const renderTimeField = ({ input: { onBlur, value, ...inputProps }, meta, onChange, ...props }) => (
    <TimePicker
        {...props}
        floatingLabelText={props.hintText}
        format='24hr'
        onChange={(event, val) => {
            inputProps.onChange(val);
            if (onChange) {
                onChange(val);
            }
        }}
        textFieldStyle={{ width: 'auto' }}
        value={value}
    />
);

renderTimeField.propTypes = {
    input   : PropTypes.object,
    meta    : PropTypes.object,
    hintText: PropTypes.element,
    onChange: PropTypes.func
};

const renderCheckbox = ({ input, label, checked }) => (
    <Checkbox label={label} onCheck={input.onChange} checked={input.value} />
);

renderCheckbox.propTypes = {
    input  : PropTypes.object,
    label  : PropTypes.element,
    checked: PropTypes.bool
};

class CreateEvent extends React.Component {
    render() {
        const { locale, handleSubmit } = this.props;
        const DateTimeFormat = global.Intl.DateTimeFormat;
        const servicesList = [];

        for (const key in services) {
            if (services.hasOwnProperty(key)) {
                servicesList.push(
                    <Field
                        key={key}
                        name={key}
                        component={renderCheckbox}
                        label={<FormattedMessage {...messages[key]} />}
                        checked={services[key]}
                    />
                );
            }
        }

        return (
            <form onSubmit={handleSubmit}>
                <Field name='name' component={renderTextField} label={<FormattedMessage {...messages.event_name} />} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Field
                        name='date'
                        component={renderDateField}
                        DateTimeFormat={DateTimeFormat}
                        locale={locale}
                        autoOk
                        hintText={<FormattedMessage {...messages.event_date} />}
                        formatDate={
                            new DateTimeFormat(locale, {
                                day  : 'numeric',
                                month: 'long',
                                year : 'numeric'
                            }).format
                        }
                        style={{ width: '58%' }}
                    />
                    <Field
                        name='time'
                        autoOk
                        hintText={<FormattedMessage {...messages.event_time} />}
                        component={renderTimeField}
                        style={{ width: '38%' }}
                    />
                </div>
                <h4>
                    <FormattedMessage {...messages.services_desc} />
                </h4>
                <div className='services-cont'>{servicesList}</div>
            </form>
        );
    }
}

CreateEvent.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    locale      : PropTypes.string.isRequired
};

export default reduxForm({
    form         : 'create-event',
    initialValues: fromJS(initialValues),
    validate
})(CreateEvent);
