import React from 'react';

export const Planner = ({ docked, onSetDocked, onSetOpen, children }) => {
    const onDockedClick = () => {
        onSetDocked(docked);
    };
    const onOpenClick = () => {
        onSetOpen(true);
    };

    return (
        <div>
            <button className='btn btn-primary' onClick={onOpenClick}>
                Open
            </button>
            <button className='btn btn-primary' onClick={onDockedClick}>
                Docked
            </button>
            { children }
        </div>
    );
};

Planner.propTypes = {
    onSetOpen  : React.PropTypes.func,
    docked     : React.PropTypes.bool,
    onSetDocked: React.PropTypes.func
};

export default Planner;

