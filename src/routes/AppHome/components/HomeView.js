import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';


export const HomeView = ({ docked, pullRight, onSetDocked, onSetOpen, onChangeSide }) => {
    const onDockedClick = () => {
        onSetDocked(docked);
    };
    const onOpenClick = () => {
        onSetOpen(true);
    };
    const onChangeSideClick = () => {
        onChangeSide(!pullRight);
    };

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

HomeView.propTypes = {
    docked      : PropTypes.bool,
    pullRight   : PropTypes.bool,
    onSetOpen   : PropTypes.func,
    onSetDocked : PropTypes.func,
    onChangeSide: PropTypes.func
};

export default HomeView;

