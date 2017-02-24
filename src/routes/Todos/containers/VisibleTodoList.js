import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import { toggleTodo, deleteTodo, getVisibleTodos } from '../modules/todos';

const mapStateToProps = (state) => {
    return {
        todoList: getVisibleTodos(
            state.getIn(['todos', 'todoList']),
            state.getIn(['todos', 'filter']),
            state.getIn(['todos', 'entries'])
        ),
        filter : state.getIn(['todos', 'filter']),
        entries: state.getIn(['todos', 'entries'])
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
