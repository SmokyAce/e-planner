import FireBaseTools from '../../../utils/firebaseTools';

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_WITH_PROVIDER_FIREBASE = 'LOGIN_WITH_PROVIDER_FIREBASE';
export const REGISTER_FIREBASE_USER = 'REGISTER_FIREBASE_USER';
export const LOGIN_FIREBASE_USER = 'LOGIN_FIREBASE_USER';
export const REQUEST_FIREBASE_USER = 'REQUEST_FIREBASE_USER';
export const FETCH_FIREBASE_USER = 'FETCH_FIREBASE_USER';
export const UPDATE_FIREBASE_USER = 'UPDATE_FIREBASE_USER';
export const CHANGE_FIREBASE_USER_PASSWORD = 'CHANGE_FIREBASE_USER_PASSWORD';
export const FIREBASE_PASSWORD_RESET_EMAIL = 'FIREBASE_PASSWORD_RESET_EMAIL';
export const LOGOUT_FIREBASE_USER = 'LOGOUT_FIREBASE_USER';

// ------------------------------------
// Action
// ------------------------------------
export const requestToFetchUser = () => {
    return {
        type: REQUEST_FIREBASE_USER
    };
};

export function loginWithProvider(provider) {
    const request = FireBaseTools.loginWithProvider(provider);

    return {
        type   : LOGIN_WITH_PROVIDER_FIREBASE,
        payload: request
    };
}

export function registerUser(user) {
    const request = FireBaseTools.registerUser(user);

    return {
        type   : REGISTER_FIREBASE_USER,
        payload: request
    };
}

export function loginUser(user) {
    const request = FireBaseTools.loginUser(user);

    return {
        type   : LOGIN_FIREBASE_USER,
        payload: request
    };
}

export function fetchUser() {
    const request = FireBaseTools.fetchUser();

    return {
        type   : FETCH_FIREBASE_USER,
        payload: request
    };
}

export function updateUser(user) {
    const request = FireBaseTools.updateUserProfile(user);

    return {
        type   : UPDATE_FIREBASE_USER,
        payload: request
    };
}

export function changePassword(newPassword) {
    const request = FireBaseTools.changePassword(newPassword);

    return {
        type   : CHANGE_FIREBASE_USER_PASSWORD,
        payload: request
    };
}

export function resetPasswordEmail(email) {
    const request = FireBaseTools.resetPasswordEmail(email);

    return {
        type   : FIREBASE_PASSWORD_RESET_EMAIL,
        payload: request
    };
}

export function logoutUser(user) {
    const request = FireBaseTools.logoutUser(user);

    return {
        type   : LOGOUT_FIREBASE_USER,
        payload: request
    };
}

// ------------------------------------
// Reducer
// ------------------------------------
export const firebaseUser = (state = null, action) => {
    switch (action.type) {
        case FETCH_FIREBASE_USER:
            return action.payload;
        case LOGOUT_FIREBASE_USER:
            return action.payload;
        case REGISTER_FIREBASE_USER:
            return action.payload;
        case LOGIN_FIREBASE_USER:
            return action.payload;
        case UPDATE_FIREBASE_USER:
            return action.payload;
        case CHANGE_FIREBASE_USER_PASSWORD:
            return action.payload;
        case FIREBASE_PASSWORD_RESET_EMAIL:
            return action.payload;
        case LOGIN_WITH_PROVIDER_FIREBASE:
            return action.payload;
        default:
            return state;
    }
};

export default firebaseUser;
