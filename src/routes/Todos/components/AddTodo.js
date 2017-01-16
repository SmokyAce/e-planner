import React from 'react';
import { addTodo } from '../modules/todos';

export const AddTodo = ({ dispatch, todoList }) => {
    let input;

    return (
        <div className='input-group'>
            <input className='form-control' placeholder='example: buy a suit' ref={node => {
                input = node;
            }}
            />
            <span className='input-group-btn'>
                <button className='btn btn-default' onClick={() => {
                    dispatch(addTodo(input.value, todoList.length)); input.value = '';
                }}
                >
                    Add todo
                </button>
            </span>
        </div>
    );
};

AddTodo.propTypes = {
    todoList: React.PropTypes.array.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

export default AddTodo;
