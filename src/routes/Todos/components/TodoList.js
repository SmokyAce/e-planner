import React from 'react';
import Todo from './Todo';

const TodoList = ({ todoList, onTodoClick }) => {
    return (
        <ul className="list-group text-left">
            { todoList.map(todo =>
                <Todo
                    key={todo.id}
                    {...todo}
                    onClick={() => onTodoClick(todo.id)}
                />
            ) }
        </ul>
    )
};

export default TodoList;