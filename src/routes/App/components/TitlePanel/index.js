import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import AppBar from 'material-ui/AppBar';
import messages from './messages';


const TitlePanel = (props) => {
    return (
        <div style={props.style}>
            <AppBar
                title={<FormattedMessage {...messages.titlePanel} />}
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
