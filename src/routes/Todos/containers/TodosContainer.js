import React from 'react';

import Filters from './FiltersContainer';
import AddTodo from './AddTodo';
import VisibleTodoList from './VisibleTodoList';

export const Todos = () => {
    return (
        <div>
            <Filters />
            <AddTodo />
            <p />
            <VisibleTodoList />
        </div>
    );
};

export default Todos;

