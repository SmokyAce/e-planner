import React from 'react';
import { addEvent } from '../../modules/app';

export const AddEvent = ({ dispatch }) => {
    let input;

    const handleKeyPress = (target) => {
        if (target.charCode === 13 && input.value !== '') {
            dispatch(addEvent({ name: input.value }));
            input.value = '';
        }
    };

    return (
        <div className='input-group'>
            <input className='form-control' placeholder='enter new event'
                onKeyPress={handleKeyPress}
                ref={node => {
                    input = node;
                }}
            />
            <span className='input-group-btn'>
                <button className='btn btn-primary'
                    onClick={() => {
                        if (input.value !== '') {
                            dispatch(addEvent({ name: input.value }));
                            input.value = '';
                        }
                    }}
                >
                    <strong>+</strong>
                </button>
            </span>
        </div>
    );
};

AddEvent.propTypes = {
    dispatch: React.PropTypes.func.isRequired
};

export default AddEvent;
