import React from 'react';
import PropTypes from 'prop-types';
// components
import { FormattedMessage } from 'react-intl';
import Spinner from '../../../components/Spinner';
// intl
import messages from './messages';
// styles
import './AppHome.scss';


const style = {
    spinner: {
        width    : '60px',
        height   : '60px',
        position : 'absolute',
        top      : '50%',
        left     : '50%',
        transform: 'translate(-50%, -50%)'
    }
};

export const AppHome = ({ docked, pullRight, restored, onSetDocked, onSetOpen, onChangeSide }) => {
    if (!restored) {
        return (
            <div style={{ position: 'relative', height: '200px' }}>
                <Spinner style={style.spinner} />
            </div>
        );
    }

    return (
        <div>
            <h2><FormattedMessage {...messages.greeting} /></h2>
            <div className='col-md-3' />
            <div className='col-md-6'>
                <div className='btn-group btn-group-justified'>
                    <a className='btn btn-default' onClick={() => onSetOpen(true)}>Open</a>
                    <a className='btn btn-default' onClick={() => onSetDocked(docked)}>Docked</a>
                    <a className='btn btn-default' onClick={() => onChangeSide(!pullRight)}>Change Side</a>
                </div>
            </div>
            <div className='col-md-3' />
        </div>
    );
};

AppHome.propTypes = {
    restored    : PropTypes.bool.isRequired,
    docked      : PropTypes.bool,
    pullRight   : PropTypes.bool,
    onSetOpen   : PropTypes.func,
    onSetDocked : PropTypes.func,
    onChangeSide: PropTypes.func
};

export default AppHome;
