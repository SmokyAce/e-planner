import React from 'react';
import { IndexLink, Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Navbar } from 'react-bootstrap';

import UserMenu from '../../containers/UserMenu';
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
                        <a href='/'>
                            <FormattedMessage{...messages.description} />
                        </a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <ul className='nav navbar-nav'>
                        <li>
                            <IndexLink to='/' activeClassName='route--active'>
                                <i className='fa fa-home fa-fw' aria-hidden='true' />
                                <FormattedMessage {...messages.home} />
                            </IndexLink>
                        </li>
                        <li>
                            <Link to='/app' activeClassName='route--active'>
                                <FormattedMessage {...messages.planner} />
                            </Link>
                        </li>
                    </ul>
                    <ul className='nav navbar-nav navbar-right' style={{ marginRight: '0px' }}>
                        <LocaleToggle />
                        <UserMenu />
                    </ul>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;
