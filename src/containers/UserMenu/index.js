import React from 'react';
import PropTypes from 'prop-types';
// components
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
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


const styles = {
    menuStyle: {
        width: '200px'
    }
};

class UserMenu extends React.Component {
    render() {
        const { currentUser } = this.props;

        if (currentUser && currentUser.get('uid')) {
            const title = (currentUser.get('displayName') === '' || !currentUser.get('displayName'))
                ? currentUser.get('email') : currentUser.get('displayName');

            return (
                <IconMenu
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    iconButtonElement={
                        <IconButton style={{ padding: '0px' }}>
                            <Avatar>{title[0]}</Avatar>
                        </IconButton>}
                    menuStyle={styles.menuStyle}
                >
                    <MenuItem
                        primaryText={<FormattedMessage {...messages.profileBtn} />}
                        containerElement={<Link to='/app/profile' />}
                    />
                    <Divider />
                    <MenuItem onClick={this.props.logoutRequest}>
                        <FormattedMessage {...messages.logoutBtn} />
                    </MenuItem>
                </IconMenu>
            );
        }

        return (
            <li key={1} style={{ listStyleType: 'none' }}>
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
