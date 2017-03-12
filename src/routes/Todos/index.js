import Todos from './containers/TodosContainer';
import { getAsyncInjectors } from '../../utils/asyncInjectors';

export default (store) => {
    const { injectReducer } = getAsyncInjectors(store);

    return ({
        path: 'todos',
        getComponent(nextState, next) {
            require.ensure([
                './containers/TodosContainer',
                './modules/todos'
            ], (require) => {
                const todos = require('./modules/todos').default;

                injectReducer('todos', todos);

                next(null, Todos);
            });
        }
    });
};
