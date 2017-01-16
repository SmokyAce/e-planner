import React from 'react';

import Filters from './FiltersContainer';
import AddTodo from '../components/AddTodo';
import VisibleTodoList from './VisibleTodoList';

export const Todos = () => {
    return (
        <div>
            <Filters />
            <AddTodo />
            <VisibleTodoList />
        </div>
    )
};

export default Todos;
