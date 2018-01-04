import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
// components
import { FormattedMessage } from 'react-intl';
// import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Popover from 'material-ui/Popover';
import CircularProgress from 'material-ui/CircularProgress';
// import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
// import Avatar from 'material-ui/Avatar';
// import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import PhotoCameraIcon from 'material-ui/svg-icons/image/photo-camera';
import AccountBoxIcon from 'material-ui/svg-icons/action/account-box';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import LocaleToogle from '../../../containers/LocaleToogle';
import ThemeToogle from '../../../containers/ThemeToogle';
import H2 from '../../../components/H2';
import H3 from '../../../components/H3';
// translations
import messages from './messages';
// styles
import './Settings.scss';

const styles = {
    header: {
        display        : 'flex',
        backgroundColor: '#757575',
        justifyContent : 'space-between'
    },
    avatar: {
        margin: '5px'
    },
    title: {
        display      : 'flex',
        flexDirection: 'column',
        color        : '#fff',
        alignSelf    : 'flex-start',
        margin       : '0 0 20px 10px'
    }
};

class Settings extends Component {
    state = {
        openLang : false,
        openTheme: false
    };
    shouldComponentUpdate = (nextProps, nextState) =>
        !nextProps.user.equals(this.props.user) ||
        nextState.openLang !== this.state.openLang ||
        nextState.openTheme !== this.state.openTheme;

    handleClick = (event, prop) => {
        event.preventDefault();

        this.setState({ ...this.state, [prop]: true, anchorEl: event.currentTarget });
    };

    handleLangClose = () => {
        this.setState({
            openLang : false,
            openTheme: false
        });
    };

    render() {
        __DEV__ && console.log('Settings render!');
        const { user, locale } = this.props;

        if (!user) {
            return <CircularProgress />;
        }

        let photoURL = user.get('photoURL');

        if (!photoURL && user.get('providerData').size > 0) {
            photoURL = user.getIn(['providerData', 0, 'photoURL']);
        }

        // if user settings 'language' is empty take from global locale
        return (
            <Paper zDepth={1} className='settings_paper'>
                <div style={styles.header}>
                    <div className='settings_avatar'>
                        <img src={photoURL} alt='avatar' />
                    </div>
                    <div className='flexbox-column' style={{ justifyContent: 'space-between' }}>
                        <IconButton tooltip={'Edit display name'} style={{ alignSelf: 'flex-end' }}>
                            <EditIcon color={'#ffff'} />
                        </IconButton>
                        <div style={styles.title}>
                            <H2>{user.get('displayName')}</H2>
                            <H3>{user.get('email')}</H3>
                        </div>
                    </div>
                </div>
                <List style={{ margin: '20px' }}>
                    <ListItem leftIcon={<AccountBoxIcon />}>
                        <FormattedMessage {...messages.language} />{' '}
                        <a onClick={e => this.handleClick(e, 'openLang')}>
                            <FormattedMessage {...messages[locale]} />
                        </a>
                    </ListItem>{' '}
                    <ListItem leftIcon={<AccountBoxIcon />}>
                        Select{' '}
                        <a onClick={e => this.handleClick(e, 'openTheme')}>
                            theme
                        </a>
                    </ListItem>
                    <ListItem insetChildren>
                        <a onClick={e => this.handleClick(e, 'openEmail')}>
                            <FormattedMessage {...messages.change_email} />
                        </a>
                    </ListItem>
                    <ListItem insetChildren>
                        <a onClick={e => this.handleClick(e, 'openPsw')}>
                            <FormattedMessage {...messages.set_psw} />
                        </a>
                    </ListItem>
                </List>
                <Popover
                    open={this.state.openLang}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    onRequestClose={this.handleLangClose}
                >
                    <LocaleToogle />
                </Popover>
                <Popover
                    open={this.state.openTheme}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    onRequestClose={this.handleLangClose}
                >
                    <ThemeToogle />
                </Popover>
                <FloatingActionButton className='settings_photo_btn' zDepth={1}>
                    <PhotoCameraIcon />
                </FloatingActionButton>
            </Paper>
        );
    }
}

Settings.propTypes = {
    user  : PropTypes.instanceOf(Map),
    locale: PropTypes.string
};

export default Settings;
