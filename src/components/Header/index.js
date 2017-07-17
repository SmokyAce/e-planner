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
    }
};

const SignIn = () => (
    <FlatButton
        label={<FormattedMessage{...messages.loginBtn} />}
        onTouchTap={this.handleOpen}
    />
);

class Header extends React.Component {
    render() {
        return (
            <div className='header-cont'>
                <AppBar
                    title={<Link to='/app'><FormattedMessage{...messages.description} /></Link>}
                    showMenuIconButton={false}
                    iconElementRight={this.props.loggedIn ? <UserMenu /> : <SignIn />}
                    iconStyleRight={styles.iconStyleRight}
                />
            </div>
        );
    }
}

Header.propTypes = {
    loggedIn: PropTypes.bool.isRequired
};

export default Header;
