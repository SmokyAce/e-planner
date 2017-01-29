import React from 'react';

const Todo = ({ onClick, completed, text }) => {
    return (
        <li onClick={onClick} style={{ textDecoration: completed ? 'line-through' : 'none' }}
            className={completed ? 'list-group-item completed' : 'list-group-item'}
        >
            {text}
        </li>
    );
};

Todo.propTypes = {
    completed: React.PropTypes.bool.isRequired,
    text     : React.PropTypes.string.isRequired,
    onClick  : React.PropTypes.func.isRequired
};

export default Todo;
