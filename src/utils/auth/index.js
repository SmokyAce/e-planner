import { firebaseAuth } from '../firebaseTools';

const auth = {
    loggedIn: () => {
        const key = Object.keys(localStorage).find(e => e.match(/firebase:authUser/));

        return !!localStorage.getItem(key);
    },
    requireAuth: (nextState, replace) => {
        const key = Object.keys(localStorage).find(e => e.match(/firebase:authUser/));
        const data = JSON.parse(localStorage.getItem(key));

        if (data === null) {
            replace({
                pathname: '/login',
                state   : {
                    nextPathname: nextState.location.pathname
                }
            });
        }
    },
    requireFirebaseAuth: (nextState, replace, callback) => {
        firebaseAuth.onAuthStateChanged((user) => {
            if (user === null) {
                replace({
                    pathname: '/login',
                    state: { nextPathname: nextState.location.pathname },
                });
            }
            callback();
        });
    },
    getUserUID: () => {
        const key = Object.keys(localStorage).find(e => e.match(/firebase:authUser/));

        return JSON.parse(localStorage.getItem(key));
    }
};

export default auth;
