import React from 'react';
import PropTypes from 'prop-types';
// components
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
// intl
import messages from './messages';


const TitlePanel = (props) => {
    return (
        <div style={props.style}>
            <AppBar
                title={
                    <Link to='/app' style={{ color: '#fff' }}>
                        <FormattedMessage {...messages.titlePanel} />
                    </Link>
                }
                showMenuIconButton={false}
            />
            {props.children}
        </div>
    );
};

TitlePanel.propTypes = {
    children: PropTypes.object.isRequired,
    style   : PropTypes.object
};

export default TitlePanel;
