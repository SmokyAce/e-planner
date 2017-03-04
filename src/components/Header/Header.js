import React from 'react';
import { IndexLink, Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, NavDropdown, MenuItem } from 'react-bootstrap';

import LocaleToggle from '../../containers/LocaleToogle';

// styles
import './Header.scss';
import messages from './messages';

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.props.requestToFetchUser();
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        this.props.logoutUser().then((data) => {
            // reload props from reducer
            this.props.requestToFetchUser();
        });
    }

    renderUserMenu(currentUser) {
        // if current user exists and user id exists than make user navigation
        if (currentUser && currentUser.uid) {
            return (
                <NavDropdown title={currentUser.displayName === '' ? currentUser.email : currentUser.displayName}
                    id='user-dropdown' eventKey='2'
                >
                    <LinkContainer to='/app/profile'>
                        <MenuItem eventKey='2.1'>
                            <FormattedMessage {...messages.profileBtn} />
                        </MenuItem>
                    </LinkContainer>
                    <MenuItem divider />
                    <LinkContainer to='/app/logout' onClick={this.logOut}>
                        <MenuItem eventKey='2.2'>
                            <FormattedMessage {...messages.logoutBtn} />
                        </MenuItem>
                    </LinkContainer>
                </NavDropdown>
            );
        }

        return [
            <li key={1}>
                <Link to='/app/login'>
                    <FormattedMessage {...messages.loginBtn} />
                </Link>
            </li>,
            <li key={2}>
                <Link to='/app/register'>
                    <FormattedMessage {...messages.registerBtn} />
                </Link>
            </li>
        ];
    }

    render() {
        return (
            <div id='header'>
                <Navbar collapseOnSelect inverse fluid>
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
                                <Link to='/counter' activeClassName='route--active'>
                                    <FormattedMessage {...messages.counter} />
                                </Link>
                            </li>
                            <li>
                                <Link to='/zen' activeClassName='route--active'>
                                    <FormattedMessage {...messages.zen} />
                                </Link>
                            </li>
                            <li>
                                <Link to='/todos' activeClassName='route--active'>
                                    <FormattedMessage {...messages.todos} />
                                </Link>
                            </li>
                            <li>
                                <Link to='/app' activeClassName='route--active'>
                                    App
                                </Link>
                            </li>
                        </ul>
                        <ul className='nav navbar-nav navbar-right' style={{ marginRight: '0px' }}>
                            <LocaleToggle />
                            { this.renderUserMenu(this.props.currentUser) }
                        </ul>
                    </Navbar.Collapse>
                </Navbar>
            </div>

        );
    }
}

Header.propTypes = {
    currentUser: React.PropTypes.object,
    fetchUser  : React.PropTypes.func.isRequired,
    logoutUser : React.PropTypes.func.isRequired
};

export default Header;
