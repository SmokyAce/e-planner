import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
// components
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
// import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
// import Avatar from 'material-ui/Avatar';
// import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import PhotoCamera from 'material-ui/svg-icons/image/photo-camera';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import LocaleToogle from '../../../containers/LocaleToogle';
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
    shouldComponentUpdate = nextState => !nextState.user.equals(this.props.user);

    render() {
        __DEV__ && console.log('Settings render!');
        const { user } = this.props;

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
                <List style={{ margin: '5px' }}>
                    <ListItem>
                        <FormattedMessage {...messages.email} />:
                        <ins> {user.get('email')} </ins>
                        <Link className='link' to='/app/profile/change-email'>
                            change email
                        </Link>
                    </ListItem>
                    <ListItem>
                        <LocaleToogle />
                    </ListItem>
                </List>
                <FloatingActionButton className='settings_photo_btn' zDepth={1}>
                    <PhotoCamera />
                </FloatingActionButton>
            </Paper>
        );
    }
}

Settings.propTypes = {
    user: PropTypes.instanceOf(Map)
};

export default Settings;
