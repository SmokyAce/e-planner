import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import { toggleTodo, deleteTodo, getVisibleTodos } from '../modules/todos';

const mapStateToProps = (state) => {
    return {
        todoList: getVisibleTodos(
            state.getIn(['app', 'todos', 'todoList']),
            state.getIn(['app', 'todos', 'filter']),
            state.getIn(['app', 'todos', 'entries'])
        ),
        filter : state.getIn(['app', 'todos', 'filter']),
        entries: state.getIn(['app', 'todos', 'entries'])
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
