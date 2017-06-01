import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';


const Success = ({ children, message }) => (
    <div className='alert alert-dismissible alert-success'>
        <h4><FormattedMessage {...messages.success} /></h4>
        <FormattedMessage {...message} />
        {children}
    </div>
);

Success.propTypes = {
    message : PropTypes.object,
    children: PropTypes.node
};

export default Success;
