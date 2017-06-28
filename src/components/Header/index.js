import React from 'react';
// Components
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import FlatButton from '../FlatButton';
import { FormattedMessage } from 'react-intl';
// styles
import './Header.scss';
// intl
import messages from './messages';


class Header extends React.Component {
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const actions = [
            <FlatButton
                key='cancel'
                label='Cancel'
                primary
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                key='submit'
                label='Submit'
                primary
                keyboardFocused
                onTouchTap={this.handleClose}
            />
        ];

        return (
            <div className='header-cont'>
                <AppBar
                    title={<FormattedMessage{...messages.description} />}
                    iconElementRight={
                        <FlatButton
                            label={<FormattedMessage{...messages.loginBtn} />}
                            onTouchTap={this.handleOpen}
                        />
                    }
                />
                <Dialog
                    title={<FormattedMessage{...messages.loginBtn} />}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    The actions in this window were passed in as an array of React objects.
                </Dialog>
            </div>
        );
    }
}

export default Header;
