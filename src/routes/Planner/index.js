import Planner from './containers/PlannerContainer';
// import { injectReducer } from '../../store/reducers';
import requireAuth from '../../utils/authenticated';

export default (store) => ({
    path: 'planner',
    getComponent(nextState, next) {
        require.ensure([
            './containers/PlannerContainer'
            // './modules/planner'
        ], (require) => {
            // const planner = require('./modules/planner').default;
            //
            // injectReducer(store, {
            //     key    : 'planner',
            //     reducer: planner
            // });

            next(null, Planner);
        });
    },
    onEnter: requireAuth
});
