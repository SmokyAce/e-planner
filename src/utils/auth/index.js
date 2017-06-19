

const auth = {
    loggedIn: () => {
        const key = Object.keys(localStorage).find(e => e.match(/firebase:authUser/));

        return !!localStorage.getItem(key);
    },
    requireAuth: (nextState, replace) => {
        const nextPath = nextState.location.pathname;
        const key = Object.keys(localStorage).find(e => e.match(/firebase:authUser/));

        if (key === undefined) { // user must authentifacate
            if (nextPath !== '/login') {
                replace('/login');
            }
        } else {
            const data = JSON.parse(localStorage.getItem(key));

            if (!data.emailVerified) {
                replace('/verified');
            }
        }
    },
    getUserUID: () => {
        const key = Object.keys(localStorage).find(e => e.match(/firebase:authUser/));

        return JSON.parse(localStorage.getItem(key));
    }
};

export default auth;
