import HomeView from './components/HomeView';
import requireAuth from '../../utils/authenticated';

// Sync route definition
export default {
    component: HomeView,
    onEnter: requireAuth
};
