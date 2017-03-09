import PlannerCoreLayout from './CoreLayout';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectSidebar } from './modules/selectors';
import { onSetOpen } from './modules/sidebar';

const mapStateToProps = (state) => createStructuredSelector({
    sidebar: makeSelectSidebar()
});

const mapDispatchToProps = (dispatch) => {
    return {
        onSetOpen: (open) => {
            dispatch(onSetOpen(open));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlannerCoreLayout);
