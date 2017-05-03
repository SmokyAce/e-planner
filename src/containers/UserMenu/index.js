import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { LinkContainer } from 'react-router-bootstrap';
import { FormattedMessage } from 'react-intl';
import { NavDropdown, MenuItem } from 'react-bootstrap';

import Spinner from '../../components/Spinner';
import { logoutRequest } from '../../routes/App/modules/auth/actions';
import { fetchUserInfoRequest } from '../../routes/App/modules/users/actions';
import {
    makeSelectLoggedIn,
    makeSelectCurrentUser
} from '../../routes/App/modules/selectors';

import messages from './messages';
import './UserMenu.scss';

class UserMenu extends React.Component {
    componentDidMount() {
        const { currentUser, loggedIn } = this.props;

        if (loggedIn && !currentUser) {
            this.props.fetchUserInfoRequest();
        }
    }

    render() {
        const { currentUser } = this.props;

        if (currentUser && currentUser.get('uid')) {
            return (
                <NavDropdown title={
                    (currentUser.get('displayName') === '' || !currentUser.get('displayName'))
                        ? currentUser.get('email') : currentUser.get('displayName')
                }
                    id='user-dropdown' eventKey='2'
                >
                    <LinkContainer to='app/profile' className='media'>
                        <MenuItem eventKey='2.1'>
                            <img className='media-object user-photo'
                                src={currentUser.getIn(['providerData', 0, 'photoURL'])}
                            />
                        </MenuItem>
                    </LinkContainer>
                    <LinkContainer to='app/profile'>
                        <MenuItem eventKey='2.2'>
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
    currentUser         : PropTypes.object,
    loggedIn            : PropTypes.bool,
    logoutRequest       : PropTypes.func,
    fetchUserInfoRequest: PropTypes.func
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
