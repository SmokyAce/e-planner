import { connect } from 'react-redux';

import Filters from '../components/Filters';
import { setVisibilityFilter } from '../modules/todos';

const mapStateToProps = (state) => {
    return {
        filter: state.todos.get('filter')
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (filter) => {
            dispatch(
                setVisibilityFilter(filter)
            );
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);

