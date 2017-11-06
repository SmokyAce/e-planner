import { connect } from 'react-redux';
import AddTodo from '../components/AddTodo';

const mapStateToProps = (state) => {
    return {
        todoList: state.getIn(['app', 'todos', 'todoList'])
    };
};

export default connect(mapStateToProps)(AddTodo);
