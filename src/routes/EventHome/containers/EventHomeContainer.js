import AppHome from '../components/HomeView';
import { connect } from 'react-redux';
import { onSetOpen, onSetDocked } from '../../App/modules/app';

const mapStateToProps = (state) => {
    return {
        docked: state.getIn(['app', 'sidebar', 'sidebarDocked'])
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

