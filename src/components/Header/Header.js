import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';
// styles
import { NavDropdown, MenuItem } from 'react-bootstrap';
import './Header.scss';

class Header extends Component {
    render() {

        const { messages, languages } = this.props.locale;

        return (
            <nav className='navbar navbar-default'>
                <div className='container-fluid'>
                    <div className='navbar-header'>
                        <a className='navbar-brand' href='/'>{ messages['app.description'] }</a>
                    </div>
                    <ul className='nav navbar-nav'>
                        <li><IndexLink to='/' activeClassName='route--active'>
                            { messages['app.route.home'] }
                        </IndexLink></li>
                        <li><Link to='/counter' activeClassName='route--active'>
                            { messages['app.route.counter'] }
                        </Link></li>
                        <li><Link to='/zen' activeClassName='route--active'>
                            { messages['app.route.zen'] }
                        </Link></li>
                    </ul>
                    <ul className='nav navbar-nav navbar-right'>
                        <NavDropdown title={ messages['app.lang'] } id='nav-dropdown' onSelect={this.props.selectedLocale}>
                             <MenuItem eventKey={languages[0].lang}>{languages[0].fullName}</MenuItem>
                            <MenuItem eventKey={languages[1].lang}>{languages[1].fullName}</MenuItem>
                        </NavDropdown>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header
