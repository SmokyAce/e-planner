import UserLogin from './components/login';
import UserProfile from './components/profile';
import UserLogout from './components/logout';
import UserRegister from './components/register';
import ResetPassword from './components/reset_password';
import requireAuth from '../../utils/authenticated';

export default (store) => {
    return {
        path       : 'user',
        childRoutes: [
            { path: 'login', component: UserLogin },
            { path: 'logout', component: UserLogout },
            { path: 'register', component: UserRegister },
            { path: 'reset', component: ResetPassword },
            { path: 'profile', component: UserProfile, onEnter: requireAuth }
        ]
    };
};
