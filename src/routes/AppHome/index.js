import AppContainer from './containers/AppHomeContainer';
import auth from '../../utils/auth';

// Sync route definition
export default {
    component: AppContainer,
    onEnter  : auth.requireAuth
};
