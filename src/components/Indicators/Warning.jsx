import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';


const Warning = ({ message }) => (
    <p className='text-warning'>
        <i className='fa fa-exclamation-triangle' />
        <FormattedMessage {...message} />
    </p>
);

Warning.propTypes = {
    message: PropTypes.object
};

export default Warning;
