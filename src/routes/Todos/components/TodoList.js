import React from 'react';
import Todo from './Todo';

const TodoList = ({ todoList, onTodoClick, entries }) => {
    return (
        <ul className="list-group text-left">
            { todoList.map(todo =>
                <Todo
                    key={todo}
                    {...entries[todo]}
                    onClick={() => onTodoClick(todo)}
                />
            ) }
        </ul>
    )
};

export default TodoList;