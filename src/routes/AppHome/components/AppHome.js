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
            <button className='btn btn-primary' onClick={() => onSetOpen(true)}>
                Open
            </button>
            <button className='btn btn-primary' onClick={() => onSetDocked(docked)}>
                Docked
            </button>
            <button className='btn btn-primary' onClick={() => onChangeSide(!pullRight)}>
                Change Side
            </button>
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

