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

export const AppHome = ({ docked, pullRight, isInitialized, onSetDocked, onSetOpen, onChangeSide }) => {
    const onDockedClick = () => {
        onSetDocked(docked);
    };
    const onOpenClick = () => {
        onSetOpen(true);
    };
    const onChangeSideClick = () => {
        onChangeSide(!pullRight);
    };

    if (!isInitialized) {
        return (
            <div style={{ position: 'relative', height: '200px' }}>
                <Spinner style={style.spinner} />
            </div>
        );
    }

    return (
        <div>
            <h2><FormattedMessage {...messages.greeting} /></h2>
            <button className='btn btn-primary' onClick={onOpenClick}>
                Open
            </button>
            <button className='btn btn-primary' onClick={onDockedClick}>
                Docked
            </button>
            <button className='btn btn-primary' onClick={onChangeSideClick}>
                Change Side
            </button>
        </div>
    );
};

AppHome.propTypes = {
    docked       : PropTypes.bool,
    pullRight    : PropTypes.bool,
    isInitialized: PropTypes.bool,
    onSetOpen    : PropTypes.func,
    onSetDocked  : PropTypes.func,
    onChangeSide : PropTypes.func
};

export default AppHome;

