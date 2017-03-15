import React from 'react';
//import { FormattedMessage } from 'react-intl';
import { Navbar } from 'react-bootstrap';
import messages from './messages';


const TitlePanel = (props) => {
    return (
        <div>
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        {messages.titlePanel.defaultMessage}
                    </Navbar.Brand>
                </Navbar.Header>
            </Navbar>
            {props.children}
        </div>
    );
};

TitlePanel.propTypes = {
    title: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.object
    ]),
    children: React.PropTypes.object
};

export default TitlePanel;
