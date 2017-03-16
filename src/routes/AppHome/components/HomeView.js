import React from 'react';
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
    docked      : React.PropTypes.bool,
    pullRight   : React.PropTypes.bool,
    onSetOpen   : React.PropTypes.func,
    onSetDocked : React.PropTypes.func,
    onChangeSide: React.PropTypes.func
};

export default HomeView;

