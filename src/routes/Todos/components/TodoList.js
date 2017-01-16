import React from 'react';
import Todo from './Todo';

const TodoList = ({ todoList, onTodoClick, entries }) => {
    return (
        <ul className='list-group text-left'>
            { todoList.map(todo =>
                <Todo
                    key={todo}
                    {...entries[todo]}
                    onClick={() => onTodoClick(todo)}
                />
            ) }
        </ul>
    );
};

TodoList.propTypes = {
    entries    : React.PropTypes.object.isRequired,
    todoList   : React.PropTypes.array.isRequired,
    onTodoClick: React.PropTypes.func.isRequired
};

export default TodoList;
