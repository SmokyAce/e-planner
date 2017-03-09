import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { NavDropdown, MenuItem } from 'react-bootstrap';

import Spinner from '../../components/Spinner';
import { fetchUserInfoRequest, logoutRequest } from '../../routes/App/modules/app';
import messages from './messages';

class UserMenu extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.loggedIn && !this.props.currentlySending) {
            this.props.fetchUserInfoRequest();
        }
    }

    render() {
        const { currentUser, currentlySending } = this.props;
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
                    <MenuItem onClick={this.props.logoutRequest}>
                        <FormattedMessage {...messages.logoutBtn} />
                    </MenuItem>
                </NavDropdown>
            );
        }
        if (currentlySending) {
            return (
                <li key={1}>
                    <Spinner />
                </li>
            );
        }
        return (
            <ul className='nav navbar-nav navbar-right'>
                <li key={1}>
                    <Link to='/app/login'>
                        <FormattedMessage {...messages.loginBtn} />
                    </Link>
                </li>
                ,
                <li key={2}>
                    <Link to='/app/register'>
                        <FormattedMessage {...messages.registerBtn} />
                    </Link>
                </li>
            </ul>
        );
    }
}

UserMenu.propTypes = {
    currentUser         : React.PropTypes.object,
    currentlySending    : React.PropTypes.bool,
    loggedIn            : React.PropTypes.bool,
    logoutRequest       : React.PropTypes.func,
    fetchUserInfoRequest: React.PropTypes.func
};


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchUserInfoRequest,
        logoutRequest
    }, dispatch);
};

const mapStateToProps = (state) => {
    return {
        currentUser     : state.getIn(['app', 'currentUser']),
        currentlySending: state.getIn(['app', 'currentlySending']),
        loggedIn        : state.getIn(['app', 'loggedIn'])
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
