import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export const UserLogout = () => {
    return (
        <form id='frmLogout' role='form'>
            <h2>
                <FormattedMessage {...messages.logout_description}/>
            </h2>
        </form>
    );
};


export default UserLogout;
