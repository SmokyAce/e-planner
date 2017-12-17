import React from 'react';
import PropTypes from 'prop-types';
// components
import { FormattedMessage } from 'react-intl';
import Link from '../../../../components/Link';
import AppBar from 'material-ui/AppBar';
// intl
import messages from './messages';

const TitlePanel = props => (
    <AppBar
        title={
            <Link to='/app' style={{ color: '#fff' }} onClick={() => props.onClick()}>
                <FormattedMessage {...messages.titlePanel} />
            </Link>
        }
        titleStyle={props.style}
        showMenuIconButton={false}
    />
);

TitlePanel.propTypes = {
    style  : PropTypes.object,
    onClick: PropTypes.func
};

export default TitlePanel;
