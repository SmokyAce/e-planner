import React from 'react';
// import PropTypes from 'prop-types';
// components
import { FormattedMessage } from 'react-intl';
// import { Link } from 'react-router';
import './Contractors.scss';
import messages from '../modules/messages';


class Contractors extends React.Component {
    render() {
        return (
            <div>
                <h1><FormattedMessage {...messages.contractors_description} /></h1>
            </div>
        );
    }
}

Contractors.propTypes = {
    // children     : PropTypes.element
};

export default Contractors;
