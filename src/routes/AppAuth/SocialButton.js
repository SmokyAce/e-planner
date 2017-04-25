import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const SocialButton = ({ name, message, onButtonClick, dispatch }) => {
    return (
        <button type='button' className={`btn btn-block btn-social btn-${name.toLowerCase()}`}
           onClick={() => {
               dispatch(onButtonClick(name.toLowerCase()));
           }}
           data-provider={name}
        >
            <span className={`fa fa-${name.toLowerCase()}`} />
            <FormattedMessage {...message} />&nbsp;{name}

        </button>
    )
};

SocialButton.propTypes = {
    name: PropTypes.string.isRequired,
    message  : PropTypes.object.isRequired,
    onButtonClick: PropTypes.func.isRequired
};

export default SocialButton;