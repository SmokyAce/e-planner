import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { LinkContainer } from 'react-router-bootstrap';
import { FormattedMessage } from 'react-intl';
import { NavDropdown, MenuItem } from 'react-bootstrap';

import Spinner from '../../components/Spinner';
import { fetchUserInfoRequest, logoutRequest } from '../../routes/App/modules/auth';
import {
    makeSelectCurrentUser,
    makeSelectLoggedIn
} from '../../routes/App/modules/selectors';

import messages from './messages';


class UserMenu extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.loggedIn && this.props.currentUser === null) {
            this.props.fetchUserInfoRequest();
        }
    }

    render() {
        const { currentUser } = this.props;
        // if current user exists and user id exists than make user navigation

        if (currentUser && currentUser.uid) {
            return (
                <NavDropdown title={
                    (currentUser.displayName === '' || currentUser.displayName === null)
                    ? currentUser.email : currentUser.displayName
                }
                    id='user-dropdown' eventKey='2'
                >
                    <LinkContainer to='/profile'>
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
        return (
            <li key={1}>
                <Spinner />
            </li>
        );
    }
}

UserMenu.propTypes = {
    currentUser         : React.PropTypes.object,
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

const mapStateToProps = state => createStructuredSelector({
    currentUser: makeSelectCurrentUser(),
    loggedIn   : makeSelectLoggedIn()
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
