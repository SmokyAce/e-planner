import React from 'react';
import { Navbar } from 'react-bootstrap';

const TitlePanel = (props) => {
    return (
        <div>
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand>{ props.title }</Navbar.Brand>
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
