import React from 'react';
import PropTypes from 'prop-types';
// components
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { FormattedMessage } from 'react-intl';
// intl
import messages from './messages';
// styles


const customContentStyle = {
    width   : '30%',
    maxWidth: 'none'
};


const Title = props => (
    <div {...props}>
        <FormattedMessage {...messages.delete_event_desc} />
    </div>
);

class DeleteEvent extends React.Component {
    render() {
        const { handleClose, openModal, removeEvent } = this.props;

        const actions = [
            <FlatButton
                label='No'
                primary
                keyboardFocused
                onTouchTap={handleClose}
                key={1}
            />,
            <FlatButton
                label='Yes'
                primary
                keyboardFocused
                onTouchTap={removeEvent}
                key={2}
            />
        ];

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
                />
            </div>
        );
    }
}

DeleteEvent.propTypes = {
    openModal  : PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    removeEvent: PropTypes.func.isRequired
};

export default DeleteEvent;
