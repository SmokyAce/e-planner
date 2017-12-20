import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
// components
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
// import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
// import Avatar from 'material-ui/Avatar';
// import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import LocaleToogle from '../../../containers/LocaleToogle';
// translations
import messages from './messages';
// styles
// import './AccountSettings.scss';

const styles = {
    header: {
        backgroundSize: 'cover',
        height        : '250px',
        width         : '300px'
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
        if (photoURL) {
            styles.header.backgroundImage = `url(${photoURL})`;
        }

        // if user settings 'language' is empty take from global locale
        return (
            <Paper zDepth={1} style={{ margin: '5px', minWidth: '300px' }}>
                <div style={{ backgroundColor: '#f6f9fc' }}>
                    <div style={styles.header}>
                        <IconButton tooltip={'Edit display name'} style={{ float: 'right' }}>
                            <EditIcon color={'#ffff'} />
                        </IconButton>
                        <div
                            style={{
                                display      : 'flex',
                                flexDirection: 'column',
                                alignSelf    : 'center',
                                padding      : '15px',
                                color        : '#fff'
                            }}
                        >
                            <span>{user.get('displayName')}</span>
                            <span>{user.get('email')}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <FormattedMessage {...messages.email} />:
                    <ins> {user.get('email')} </ins>
                    <Link className='link' to='/app/profile/change-email'>
                        change email
                    </Link>
                </div>
                <LocaleToogle />
            </Paper>
        );
    }
}

Settings.propTypes = {
    user: PropTypes.instanceOf(Map)
};

export default Settings;
