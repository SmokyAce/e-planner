import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
// styles
import { NavDropdown, MenuItem } from 'react-bootstrap';
import './Header.scss';

class Header extends Component {

    constructor(props) {
        super(props);

        this.props.fetchUser();
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        this.props.logoutUser().then((data) => {
            // reload props from reducer
            this.props.fetchUser();
        });
    }

    renderUserMenu(currentUser, messages) {
        // if current user exists and user id exists than make user navigation
        if (currentUser && currentUser.uid) {
            return (
                <NavDropdown title={currentUser.displayName === '' ? currentUser.email : currentUser.displayName}
                    id='user-dropdown'
                >
                    <LinkContainer to='/user/profile'>
                        <MenuItem eventKey='1'>{ messages['app.profile.btn'] }</MenuItem>
                    </LinkContainer>
                    <MenuItem divider />
                    <LinkContainer to='/user/logout' onClick={this.logOut}>
                        <MenuItem eventKey='2'>{messages['app.logout.btn']}</MenuItem>
                    </LinkContainer>
                </NavDropdown>
            );
        }

        return [
            <li key={1}><Link to='/user/login'>{ messages['app.login.btn'] }</Link></li>,
            <li key={2}><Link to='/user/register'>{ messages['app.register.btn'] }</Link></li>
        ];
    }

    render() {
        const { messages, languages, lang } = this.props.locale;

        return (
            <nav className='navbar navbar-default'>
                <div className='container-fluid'>
                    <div className='navbar-header'>
                        <a className='navbar-brand' href='/'>{ messages['app.description'] }</a>
                    </div>
                    <ul className='nav navbar-nav'>
                        <li>
                            <IndexLink to='/' activeClassName='route--active'>
                                <i className='fa fa-home fa-fw' aria-hidden='true' />
                                { messages['app.route.home'] }
                            </IndexLink>
                        </li>
                        <li>
                            <Link to='/counter' activeClassName='route--active'>
                                { messages['app.route.counter'] }
                            </Link>
                        </li>
                        <li>
                            <Link to='/zen' activeClassName='route--active'>
                                { messages['app.route.zen'] }
                            </Link>
                        </li>
                        <li>
                            <Link to='/todos' activeClassName='route--active'>
                                { messages['app.route.todos'] }
                            </Link>
                        </li>
                    </ul>
                    <ul className='nav navbar-nav navbar-right'>
                        { this.renderUserMenu(this.props.currentUser, messages) }
                    </ul>
                    <ul className='nav navbar-nav navbar-right'>
                        <NavDropdown title={lang} id='lang-dropdown'
                            onSelect={this.props.selectedLocale}
                        >
                            { languages.map(item =>
                                <MenuItem disabled={item.lang === lang} eventKey={item.lang} key={item.lang}>
                                    {item.fullName}
                                </MenuItem>
                            )}
                        </NavDropdown>
                    </ul>
                </div>
            </nav>
        );
    }
}

Header.propTypes = {
    currentUser   : React.PropTypes.object.isRequired,
    fetchUser     : React.PropTypes.func.isRequired,
    logoutUser    : React.PropTypes.func.isRequired,
    locale        : React.PropTypes.object.isRequired,
    selectedLocale: React.PropTypes.func.isRequired
};

export default Header;
