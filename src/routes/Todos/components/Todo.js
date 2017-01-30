import React from 'react';

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
    completed     : React.PropTypes.bool.isRequired,
    text          : React.PropTypes.string.isRequired,
    onClick       : React.PropTypes.func.isRequired,
    onDelTodoClick: React.PropTypes.func.isRequired
};

export default Todo;
