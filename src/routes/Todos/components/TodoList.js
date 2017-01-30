import React from 'react';
import Immutable from 'immutable';
import Todo from './Todo';

const TodoList = ({ onTodoClick, onDelTodoClick, todoList, entries }) => {
    return (
        <ul className='list-group text-left'>
            { todoList.map((todo) => {
                return (
                    <Todo
                        key={todo}
                        {...entries.get(todo)}
                        onClick={() => onTodoClick(todo)}
                        onDelTodoClick={() => onDelTodoClick(todo)}
                    />
                );
            }
            ) }
        </ul>
    );
};

TodoList.propTypes = {
    entries       : React.PropTypes.instanceOf(Immutable.Map).isRequired,
    todoList      : React.PropTypes.instanceOf(Immutable.List).isRequired,
    onTodoClick   : React.PropTypes.func.isRequired,
    onDelTodoClick: React.PropTypes.func.isRequired
};

export default TodoList;
