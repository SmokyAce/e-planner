import React from 'react';
import PropTypes from 'prop-types';
// Components
import AppBar from 'material-ui/AppBar';
import FlatButton from '../FlatButton';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import UserMenu from '../../containers/UserMenu';
// styles
import './Header.scss';
// intl
import messages from './messages';

const styles = {
    iconStyleRight: {
        margin: 'auto'
    },
    appBar   : {},
    rightIcon: {
        display       : 'flex',
        justifyContent: 'space-between',
        alignItems    : 'center',
        width         : '120%'
    }
};

const SignIn = () => (
    <FlatButton
        label={
            <Link to='/login' style={{ color: '#fff' }}>
                <FormattedMessage {...messages.loginBtn} />
            </Link>
        }
        onClick={this.handleOpen}
    />
);

const renderTitle = currentPage => {
    if (currentPage === undefined) {
        return (
            <Link to='/app' style={{ color: '#fff' }}>
                <FormattedMessage {...messages.description} />
            </Link>
        );
    }
    return <FormattedMessage {...messages[currentPage]} />;
};

class Header extends React.Component {
    render() {
        const { loggedIn, onMenuIconButtonTouchTap, style, currentPage, connection } = this.props;
        const appBarstyle = { ...styles.appBar, ...style };
        const offline = connection === 'Offline';

        return (
            <div className='header-cont'>
                <AppBar
                    title={renderTitle(currentPage)}
                    showMenuIconButton={loggedIn === undefined ? false : loggedIn}
                    onLeftIconButtonTouchTap={onMenuIconButtonTouchTap}
                    iconElementRight={
                        loggedIn ? (
                            <div style={styles.rightIcon}>
                                {offline && <div className='offline-status' />}
                                <UserMenu />
                            </div>
                        ) : (
                            <SignIn />
                        )
                    }
                    iconStyleRight={styles.iconStyleRight}
                    style={appBarstyle}
                />
            </div>
        );
    }
}

Header.propTypes = {
    loggedIn                : PropTypes.bool,
    onMenuIconButtonTouchTap: PropTypes.func,
    style                   : PropTypes.object,
    currentPage             : PropTypes.string,
    connection              : PropTypes.string
};

export default Header;
