import React from 'react';
import PropTypes from 'prop-types';
// components
import { Field, reduxForm } from 'redux-form/immutable';
import ReduxFormTextField from '../../../../components/Form/ReduxFormTextField';
import DatePicker from 'material-ui/DatePicker';
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
    guests : true,
    todos  : true,
    budjet : true,
    timing : false,
    counter: false
};

const renderTextField = props => (<ReduxFormTextField {...props} />);

const renderDateField = ({ input: { onBlur, ...inputProps }, meta, onChange, ...props }) => (
    <DatePicker
        {...props}
        floatingLabelText={props.hintText}
        onChange={(event, value) => {
            inputProps.onChange(value);
            if (onChange) {
                onChange(value);
            }
        }}
    />
);

renderDateField.propTypes = {
    input   : PropTypes.object,
    meta    : PropTypes.object,
    hintText: PropTypes.element,
    onChange: PropTypes.func
};

const renderCheckbox = ({ input, label, defaultChecked }) => (
    <Checkbox
        label={label}
        onCheck={input.onChange}
        defaultChecked={defaultChecked}
    />
);

renderCheckbox.propTypes = {
    input         : PropTypes.object,
    label         : PropTypes.element,
    defaultChecked: PropTypes.bool
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
                        defaultChecked={services[key]}
                    />
                );
            }
        }

        return (
            <form
                onSubmit={handleSubmit}
            >
                <Field
                    name='name'
                    component={renderTextField}
                    label={<FormattedMessage {...messages.event_name} />}
                /><br />
                <Field
                    name='date'
                    component={renderDateField}
                    DateTimeFormat={DateTimeFormat}
                    locale={locale}
                    autoOk
                    hintText={<FormattedMessage {...messages.event_date} />}
                /><br />
                <h4><FormattedMessage {...messages.services_desc} /></h4>
                <div className='services-cont'>
                    {servicesList}
                </div>
            </form>
        );
    }
}

CreateEvent.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    locale      : PropTypes.string.isRequired
};

export default reduxForm({
    form: 'create-event',
    validate
})(CreateEvent);
