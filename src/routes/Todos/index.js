import Todos from './containers/TodosContainer';
import { injectReducer } from '../../store/reducers';

export default (store) => ({
    path: 'todos',
    getComponent(nextState, next) {
        require.ensure([
            './containers/TodosContainer',
            './modules/todos'
        ], (require) => {
            const todos = require('./modules/todos').default;

            injectReducer(store, {
                key    : 'todos',
                reducer: todos
            });

            next(null, Todos);
        });
    }
});
