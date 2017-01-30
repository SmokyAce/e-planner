import React from 'react';
import Immutable from 'immutable';
import { addTodo } from '../modules/todos';

export const AddTodo = ({ dispatch, todoList }) => {
    let input;

    const handleKeyPress = (target) => {
        if (target.charCode === 13) {
            dispatch(addTodo(input.value, todoList.size));
            input.value = '';
        }
    };

    return (
        <div className='input-group'>
            <input className='form-control' placeholder='example: buy a suit'
                onKeyPress={handleKeyPress}
                ref={node => {
                    input = node;
                }}
            />
            <span className='input-group-btn'>
                <button className='btn btn-default'
                    onClick={() => {
                        dispatch(addTodo(input.value, todoList.size)); input.value = '';
                    }}
                >
                    Add todo
                </button>
            </span>
        </div>
    );
};

AddTodo.propTypes = {
    todoList: React.PropTypes.instanceOf(Immutable.List).isRequired,
    dispatch: React.PropTypes.func.isRequired
};

export default AddTodo;
