import React, { Component } from 'react';
import PropTypes from 'prop-types';
// components
import { Field, reduxForm } from 'redux-form/immutable';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import DatePicker from 'material-ui/DatePicker';
import AddContentIcon from 'material-ui/svg-icons/content/add-box';
import ReduxFormTextField from '../../../../components/Form/ReduxFormTextField';
import Error from '../../../../components/Indicators/Error';
import { FormattedMessage } from 'react-intl';

import validate from './validate';
import messages from './messages';

const styles = {
    paper: {
        display: 'flex',
        padding: '10px 15px 2px 15px',
        margin : '5px 5px 0 5px'
    }
};

const renderTextField = props => {
    const { meta } = props;

    return <ReduxFormTextField {...props} formattedError={<FormattedMessage {...messages[meta.error]} />} />;
};

renderTextField.propTypes = {
    meta: PropTypes.object
};

const renderDateField = ({ input: { onBlur, ...inputProps }, meta, onChange, ...props }) => (
    <DatePicker
        {...props}
        onChange={(event, val) => {
            inputProps.onChange(val);
            if (onChange) {
                onChange(val);
            }
        }}
        textFieldStyle={{ width: 'auto' }}
    />
);

renderDateField.propTypes = {
    input   : PropTypes.object,
    meta    : PropTypes.object,
    hintText: PropTypes.element,
    onChange: PropTypes.func
};

class AddTask extends Component {
    render() {
        const DateTimeFormat = global.Intl.DateTimeFormat;
        const { locale, handleSubmit, error, invalid } = this.props;

        __DEV__ && console.log('AddTask render!');

        return (
            <form onSubmit={handleSubmit}>
                <Paper zDepth={1} style={styles.paper}>
                    <Field
                        name='description'
                        component={renderTextField}
                        hintText={<FormattedMessage {...messages.description} />}
                    />
                    <Field
                        name='date'
                        component={renderDateField}
                        DateTimeFormat={DateTimeFormat}
                        locale={locale}
                        autoOk
                        hintText={<FormattedMessage {...messages.plannedDate} />}
                        formatDate={
                            new DateTimeFormat(locale, {
                                day  : 'numeric',
                                month: 'long',
                                year : 'numeric'
                            }).format
                        }
                        style={{ marginLeft: '10px' }}
                    />
                    <IconButton
                        type='submit'
                        iconStyle={{ width: '32px', height: '32px' }}
                        style={{
                            maxContent  : 'max-content',
                            marginTop   : 'auto',
                            marginBottom: '8px'
                        }}
                        disabled={invalid}
                    >
                        <AddContentIcon color={'#757575'} />
                    </IconButton>
                    {error !== undefined && <Error message={error} />}
                </Paper>
            </form>
        );
    }
}

AddTask.propTypes = {
    // redux-form props
    handleSubmit: PropTypes.func.isRequired,
    error       : PropTypes.string,
    invalid     : PropTypes.bool,
    // props
    locale      : PropTypes.string
};

export default reduxForm({
    form: 'add-task',
    validate
})(AddTask);
