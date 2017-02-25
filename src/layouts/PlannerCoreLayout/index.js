import PlannerCoreLayout from './CoreLayout';
import { connect } from 'react-redux';
import { onSetOpen } from './modules/sidebar';

const mapStateToProps = (state) => {
    return {
        sidebar: state.get('sidebar')
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetOpen: (open) => {
            dispatch(onSetOpen(open));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlannerCoreLayout);
