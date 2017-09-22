import React from 'react';
import PropTypes from 'prop-types';
import { increment, doubleAsync } from '../modules/counter';


export const Counter = ({ counter, params, dispatch }) => {
    const onIncrementClick = (e) => {
        dispatch(increment(params.id, counter));
    };
    const onDoubleClick    = (e) => {
        dispatch(doubleAsync(params.id, counter));
    };

    return (
        <div style={{ margin: '0 auto' }}>
            <h2>Counter: { counter }</h2>
            <button className='btn btn-default btn-counter' onClick={onIncrementClick}>
                Increment
            </button>
            {' '}
            <button className='btn btn-default btn-counter' onClick={onDoubleClick}>
                Double (Async)
            </button>
        </div>
    );
};

Counter.propTypes = {
    counter : PropTypes.number.isRequired,
    params  : PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default Counter;
