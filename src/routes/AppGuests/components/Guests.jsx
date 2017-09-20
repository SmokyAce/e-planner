import React from 'react';
// import PropTypes from 'prop-types';
// components
import { FormattedMessage } from 'react-intl';
// import { Link } from 'react-router';
import './Guests.scss';
import messages from '../modules/messages';


class Guests extends React.Component {
    render() {
        return (
            <div>
                <h1><FormattedMessage {...messages.guests_description} /></h1>
            </div>
        );
    }
}

Guests.propTypes = {
    // children     : PropTypes.element
};

export default Guests;
