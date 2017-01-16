import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import { toggleTodo, getVisibleTodos } from '../modules/todos';

const mapStateToProps = (state) => {
    return {
        todoList: getVisibleTodos(state.todos.todoList, state.todos.filter, state.todos.entries),
        filter: state.todos.filter,
        entries: state.todos.entries
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(toggleTodo(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
