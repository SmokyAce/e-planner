import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { addTodo } from '../modules/todos';


export const AddTodo = ({ dispatch, todoList }) => {
    let input;

    const handleKeyPress = (target) => {
        if (target.charCode === 13) {
            dispatch(addTodo(input.value, todoList.size === 0 ? 0 : todoList.get(todoList.size - 1) + 1));
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
                        dispatch(addTodo(input.value, todoList.size === 0 ? 0 : todoList.get(todoList.size - 1) + 1));
                        input.value = '';
                    }}
                >
                    Add todo
                </button>
            </span>
        </div>
    );
};

AddTodo.propTypes = {
    todoList: PropTypes.instanceOf(Immutable.List).isRequired,
    dispatch: PropTypes.func.isRequired
};

export default AddTodo;
