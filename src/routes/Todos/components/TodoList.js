import React from 'react';
import PropTypes from 'prop-types';
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
    entries       : PropTypes.instanceOf(Immutable.Map).isRequired,
    todoList      : PropTypes.instanceOf(Immutable.List).isRequired,
    onTodoClick   : PropTypes.func.isRequired,
    onDelTodoClick: PropTypes.func.isRequired
};

export default TodoList;
