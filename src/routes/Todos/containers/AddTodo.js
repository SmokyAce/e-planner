import { connect } from 'react-redux';
import AddTodo from '../components/AddTodo';

const mapStateToProps = (state) => {
    return {
        todoList: state.todos.get('todoList')
    };
};

export default connect(mapStateToProps)(AddTodo);
