import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
    makeSelectAppSyncState,
    makeSelectAppConnectionState
} from '../../routes/App/modules/selectors';


const AppStatus = ({ connection, synchronization }) => {
    const renderSyncStatus = () => {
        if (synchronization === 'start') {
            return (
                <li>
                    <a><i className='fa fa-refresh fa-spin fa-lg fa-fw' /> </a>
                </li>
            );
        }
    };
    const renderConnectionStatus = () => {
        if (connection === 'Offline') {
            return (
                <li>
                    <a>{connection}</a>
                </li>
            );
        }
    };

    return (
        <ul className='nav navbar-nav'>
            {renderConnectionStatus()}
            {renderSyncStatus()}
        </ul>
    );
};

AppStatus.propTypes = {
    connection     : PropTypes.string,
    synchronization: PropTypes.string
};


const mapStateToProps = state => createStructuredSelector({
    connection     : makeSelectAppConnectionState(),
    synchronization: makeSelectAppSyncState()
});

export default connect(mapStateToProps, null)(AppStatus);
