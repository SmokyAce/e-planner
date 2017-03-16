import FireBaseTools from '../../../utils/firebaseTools';

// ------------------------------------
// Constants
// ------------------------------------
export const FIREBASE_PASSWORD_RESET_EMAIL = 'FIREBASE_PASSWORD_RESET_EMAIL';

// ------------------------------------
// Action
// ------------------------------------
export function resetPasswordEmail(email) {
    const request = FireBaseTools.resetPasswordEmail(email);

    return {
        type   : FIREBASE_PASSWORD_RESET_EMAIL,
        payload: request
    };
}
