import React from 'react';
// Components
import AppBar from 'material-ui/AppBar';
import LoginButton from '../FlatButton';
import { FormattedMessage } from 'react-intl';
// styles
import './Header.scss';
// intl
import messages from './messages';


const Header = () => {
    return (
        <div className='header-cont'>
            <AppBar
                title={<FormattedMessage{...messages.description} />}
                iconElementRight={<LoginButton label={<FormattedMessage{...messages.loginBtn} />} />}
            />
        </div>
    );
};

export default Header;
