import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import { toggleTodo, deleteTodo, getVisibleTodos } from '../modules/todos';

const mapStateToProps = (state) => {
    return {
        todoList: getVisibleTodos(state.todos.get('todoList'), state.todos.get('filter'), state.todos.get('entries')),
        filter  : state.todos.get('filter'),
        entries : state.todos.get('entries')
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(toggleTodo(id));
        },
        onDelTodoClick: (id) => {
            dispatch(deleteTodo(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
