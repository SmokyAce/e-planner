import Planner from '../components/Planner';
import { connect } from 'react-redux';
import { onSetOpen } from '../../../layouts/PlannerCoreLayout/modules/sidebar';

const mapStateToProps = (state) => {
    return {
        // sidebar: state.sidebar
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetOpen: (open) => {
            dispatch(onSetOpen(open));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Planner);

