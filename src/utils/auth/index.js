
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
        let userInfo;
        const key = Object.keys(localStorage).find(e => e.match(/firebase:authUser/));

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(JSON.parse(localStorage.getItem(key)))
            }, 100)
        }
        );
    }
};

export default auth;
