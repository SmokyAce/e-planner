import React from 'react';
import PropTypes from 'prop-types';
// components
import { Field, reduxForm } from 'redux-form/immutable';
import ReduxFormTextField from '../../../../components/Form/ReduxFormTextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
// import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
// import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
// intl
import messages from './messages';
// styles
// import './EventsList.scss';


const customContentStyle = {
    width   : '30%',
    maxWidth: 'none'
};


const renderTextField = props => (<ReduxFormTextField {...props} />);

const Title = props => (
    <div {...props}>
        <FormattedMessage {...messages.create_event_desc} />
    </div>
);

class CreateEvent extends React.Component {
    render() {
        const { handleClose, openModal, locale } = this.props;

        const actions = [
            <FlatButton
                label='Cancel'
                primary
                keyboardFocused
                onTouchTap={handleClose}
                key={1}
            />,
            <FlatButton
                label='Ok'
                primary
                keyboardFocused
                onTouchTap={handleClose}
                key={2}
            />
        ];

        const DateTimeFormat = global.Intl.DateTimeFormat;

        return (
            <div>
                <Dialog
                    title={<Title />}
                    titleStyle={{ margin: '10px' }}
                    actions={actions}
                    modal={false}
                    open={openModal}
                    onRequestClose={handleClose}
                    contentStyle={customContentStyle}
                    autoDetectWindowHeight
                >
                    <Field
                        name='eventName'
                        component={renderTextField}
                        label={<FormattedMessage {...messages.event_name} />}
                    /><br />
                    <DatePicker
                        hintText={<FormattedMessage {...messages.event_date} />}
                        locale={locale}
                        DateTimeFormat={DateTimeFormat}
                    />
                </Dialog>
            </div>
        );
    }
}

CreateEvent.propTypes = {
    openModal  : PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    locale     : PropTypes.string.isRequired
};

export default reduxForm({
    form: 'create-event'
    // validate
})(CreateEvent);
