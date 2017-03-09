import AppHome from '../components/HomeView';
import { connect } from 'react-redux';
import { onSetOpen, onSetDocked } from '../../../layouts/PlannerCoreLayout/modules/sidebar';

const mapStateToProps = (state) => {
    return {
        docked: state.getIn(['global', 'sidebar', 'sidebarDocked'])
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetOpen: (open) => {
            dispatch(onSetOpen(open));
        },
        onSetDocked: (docked) => {
            dispatch(onSetDocked(docked));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHome);

