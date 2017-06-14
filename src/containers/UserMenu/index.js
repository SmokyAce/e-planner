import React from 'react';
import PropTypes from 'prop-types';
// components
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { FormattedMessage } from 'react-intl';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import Spinner from '../../components/Spinner';
// actions
import { bindActionCreators } from 'redux';
import { logoutRequest } from '../../routes/AppAuth/modules/actions';
// selectors
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from '../../routes/App/modules/selectors';
// intl
import messages from './messages';
// style
import './UserMenu.scss';


class UserMenu extends React.Component {

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
                    <LinkContainer to='/app/profile'>
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
    currentUser  : PropTypes.object,
    logoutRequest: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        logoutRequest
    }, dispatch);
};

const mapStateToProps = state => createStructuredSelector({
    currentUser: makeSelectCurrentUser()
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
