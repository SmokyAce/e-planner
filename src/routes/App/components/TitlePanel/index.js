import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Navbar } from 'react-bootstrap';
import messages from './messages';


const TitlePanel = (props) => {
    return (
        <div style={props.style}>
            <Navbar inverse>
                <Navbar.Header>
                    <div className='navbar-brand'>
                        <FormattedMessage {...messages.titlePanel} />
                    </div>
                </Navbar.Header>
            </Navbar>
            {props.children}
        </div>
    );
};

TitlePanel.propTypes = {
    children: PropTypes.object.isRequired,
    style   : PropTypes.object
};

export default TitlePanel;
