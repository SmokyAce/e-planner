
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
    getUserUID: () => {
        const key = Object.keys(localStorage).find(e => e.match(/firebase:authUser/));

        return JSON.parse(localStorage.getItem(key));
    }
};

export default auth;
