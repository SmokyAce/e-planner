import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Navbar } from 'react-bootstrap';
import messages from './messages';


const TitlePanel = (props) => {
    return (
        <div>
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
    children: React.PropTypes.object
};

export default TitlePanel;
