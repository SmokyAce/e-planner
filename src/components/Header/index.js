import React from 'react';
import { FormattedMessage } from 'react-intl';

import LocaleToggle from '../../containers/LocaleToogle';
// Material-UI
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

// styles
import './Header.scss';
import messages from './messages';


const Title = () => (
    <FormattedMessage{...messages.description} />
);

class Login extends React.Component {
    static muiName = 'FlatButton';

    render() {
        return (
            <div>
                <LocaleToggle {...this.props} />
                <FlatButton {...this.props} label='Login' />
            </div>
        );
    }
}

const Header = () => {
    return (
        <div>
            <AppBar
                title={<Title />}
                iconElementRight={<Login />}
                className='text-left'
            />
        </div>
    );
    // return (
    //     <div id='header'>
    //         <Navbar inverse fluid collapseOnSelect>
    //             <Navbar.Header>
    //                 <Navbar.Brand>
    //                     <Link to='/'>
    //                         <FormattedMessage{...messages.description} />
    //                     </Link>
    //                 </Navbar.Brand>
    //                 <Navbar.Toggle />
    //             </Navbar.Header>
    //             <ul className='nav navbar-nav'>
    //                 <li>
    //                     <Link to='/app' activeClassName='route--active'>
    //                         <FormattedMessage {...messages.planner} />
    //                     </Link>
    //                 </li>
    //             </ul>

    //             <ul className='nav navbar-nav navbar-right' style={{ marginRight: '0px' }}>
    //                 <LocaleToggle />
    //                 <li key={3}>
    //                     <Link to='/login'>
    //                         <FormattedMessage {...messages.loginBtn} />
    //                     </Link>
    //                 </li>
    //             </ul>
    //         </Navbar>
    //     </div>
    // );
};

export default Header;
