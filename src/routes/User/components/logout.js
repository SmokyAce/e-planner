import React from 'react';
import { connect } from 'react-redux';

export const UserLogout = ({ locale }) => {
    return (
        <form id='frmLogout' role='form'>
            <h2>{ locale.messages['app.logout.description'] }</h2>
        </form>
    );
};

UserLogout.propTypes = {
    locale: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        locale: state.locale
    };
}

export default connect(mapStateToProps)(UserLogout);
