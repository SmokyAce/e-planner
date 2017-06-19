import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Navbar } from 'react-bootstrap';

import UserMenu from '../../containers/UserMenu';
import LocaleToggle from '../../containers/LocaleToogle';
import AppStatus from '../../containers/AppStatus';

// styles
import './Header.scss';
import messages from './messages';

const Header = ({ landingPage }) => {
    const renderUserMenu = () => {
        if (landingPage) {
            return (
                <ul className='nav navbar-nav navbar-right'>
                    <li key={1}>
                        <Link to='/login'>
                            <FormattedMessage {...messages.loginBtn} />
                        </Link>
                    </li>
                    ,
                    <li key={2}>
                        <Link to='/register'>
                            <FormattedMessage {...messages.registerBtn} />
                        </Link>
                    </li>
                </ul>
            );
        }

        return (
            <UserMenu />
        );
    };
    const renderAppStatus = () => {
        if (!landingPage) {
            return (
                <AppStatus />
            );
        }
    };

    return (
        <div id='header'>
            <Navbar inverse fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to='/'>
                            <FormattedMessage{...messages.description} />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <ul className='nav navbar-nav'>
                        <li>
                            <Link to='/app' activeClassName='route--active'>
                                <FormattedMessage {...messages.planner} />
                            </Link>
                        </li>
                    </ul>
                    <ul className='nav navbar-nav navbar-right' style={{ marginRight: '0px' }}>
                        {renderAppStatus()}
                        <LocaleToggle />
                        {renderUserMenu()}
                    </ul>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

Header.propTypes = {
    landingPage: PropTypes.bool
};

export default Header;
