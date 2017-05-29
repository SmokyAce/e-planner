// lib
import { cancel, put, take, fork, call, takeLatest } from 'redux-saga/effects';
import { SubmissionError, reset } from 'redux-form';
// action types
import {
    CHANGE_USER_EMAIL_REQUEST,
    CHANGE_USER_EMAIL_SUCCESS,
    CHANGE_USER_EMAIL_FAILURE
} from '../../../AppAuth/modules/actionTypes';
import { LOCATION_CHANGE } from '../../../../store/reducers/location';
// utils
import { firebaseAuth } from '../../../../utils/firebaseTools';
import formSaga from '../../../../utils/reduxFormSaga';


const updateEmail = (newEmail) => {
    const User = firebaseAuth.currentUser;

    return User.updateEmail(newEmail)
        .then(() => ({ success: true }))
        .catch(error => {
            throw new SubmissionError({ _error: error.message });
        });
};

function * changeEmail(action) {
    const result = yield call(formSaga, 'change-email', updateEmail, action.payload);

    if (result.success) {
        yield put({ type: CHANGE_USER_EMAIL_SUCCESS });
    } else {
        yield put({ type: CHANGE_USER_EMAIL_FAILURE });
    }
}

function * watchChangeEmail() {
    const task = yield fork(takeLatest, CHANGE_USER_EMAIL_REQUEST, changeEmail);

    yield take(LOCATION_CHANGE);
    yield put(reset('change-email'));
    yield cancel(task);
}

export default [
    watchChangeEmail
];
