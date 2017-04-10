import React from 'react';
import PropTypes from 'prop-types';

import './Todo.scss';


const Todo = ({ onClick, onDelTodoClick, completed, text }) => {
    return (
        <div className='input-group'>
            <li onClick={onClick}
                style={{ textDecoration: completed ? 'line-through' : 'none' }}
                className={completed ? 'list-group-item form-control completed' : 'list-group-item form-control'}
            >
                {text}
            </li>
            <span className='input-group-btn'>
                <button className='btn btn-primary'
                    onClick={onDelTodoClick}
                >
                    delete
                </button>
            </span>
        </div>
    );
};

Todo.propTypes = {
    completed     : PropTypes.bool.isRequired,
    text          : PropTypes.string.isRequired,
    onClick       : PropTypes.func.isRequired,
    onDelTodoClick: PropTypes.func.isRequired
};

export default Todo;
