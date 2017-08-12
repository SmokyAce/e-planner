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
    appBar: {}
};

const SignIn = () => (
    <FlatButton
        label={<Link to='/login' style={{ color: '#fff' }}><FormattedMessage {...messages.loginBtn} /></Link>}
        onTouchTap={this.handleOpen}
    />
);

class Header extends React.Component {
    render() {
        const { loggedIn, onMenuIconButtonTouchTap, style } = this.props;

        const appBarstyle = { ...styles.appBar, ...style };

        return (
            <div className='header-cont'>
                <AppBar
                    title={
                        <Link to='/app' style={{ color: '#fff' }}>
                            <FormattedMessage {...messages.description} />
                        </Link>
                    }
                    showMenuIconButton={loggedIn === undefined ? false : loggedIn}
                    onLeftIconButtonTouchTap={onMenuIconButtonTouchTap}
                    iconElementRight={loggedIn ? <UserMenu /> : <SignIn />}
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
    style                   : PropTypes.object
};

export default Header;
