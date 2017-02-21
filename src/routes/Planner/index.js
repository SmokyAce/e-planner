import Planner from './containers/PlannerContainer';
// import { injectReducer } from '../../store/reducers';
import requireAuth from '../../utils/authenticated';

export default (store) => ({
    path: 'planner',
    getComponent(nextState, next) {
        require.ensure([
            './containers/PlannerContainer'
            // './modules/todos'
        ], (require) => {
            // const todos = require('./modules/todos').default;
            //
            // injectReducer(store, {
            //     key    : 'todos',
            //     reducer: todos
            // });

            next(null, Planner);
        });
    },
    onEnter: requireAuth
});
