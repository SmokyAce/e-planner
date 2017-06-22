import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Navbar } from 'react-bootstrap';

import LocaleToggle from '../../containers/LocaleToogle';

// styles
import './Header.scss';
import messages from './messages';

const Header = () => {
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
                <ul className='nav navbar-nav'>
                    <li>
                        <Link to='/app' activeClassName='route--active'>
                            <FormattedMessage {...messages.planner} />
                        </Link>
                    </li>
                </ul>

                <ul className='nav navbar-nav navbar-right' style={{ marginRight: '0px' }}>
                    <LocaleToggle />
                    <li key={3}>
                        <Link to='/login'>
                            <FormattedMessage {...messages.loginBtn} />
                        </Link>
                    </li>
                </ul>
            </Navbar>
        </div>
    );
};

export default Header;
