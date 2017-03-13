import React from 'react';


export const HomeView = ({ docked, onSetDocked, onSetOpen }) => {
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
        </div>
    );
};

HomeView.propTypes = {
    onSetOpen  : React.PropTypes.func,
    docked     : React.PropTypes.bool,
    onSetDocked: React.PropTypes.func
};

export default HomeView;

