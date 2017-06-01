import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';


const Danger = ({ message }) => {
    return (
        <div className='alert alert-dismissible alert-danger'>
            <h4><FormattedMessage {...messages.error} /></h4>
            <p>{message}</p>
        </div>
    );
};

Danger.propTypes = {
    message: PropTypes.string
};

export default Danger;
