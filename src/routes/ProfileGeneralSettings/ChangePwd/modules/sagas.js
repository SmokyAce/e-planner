// lib
import { cancel, put, take, fork, call, takeLatest } from 'redux-saga/effects';
import { SubmissionError, reset } from 'redux-form';
// action types
import {
    CHANGE_USER_PASSWORD_REQUEST,
    CHANGE_USER_PASSWORD_SUCCESS,
    CHANGE_USER_PASSWORD_FAILURE
} from '../../../AppAuth/modules/actionTypes';
import { LOCATION_CHANGE } from '../../../../store/reducers/location';
// utils
import { firebaseAuth } from '../../../../utils/firebaseTools';
import formSaga from '../../../../utils/reduxFormSaga';


const changeAccountPwd = (newPassword) => {
    const User = firebaseAuth.currentUser;

    return User.updatePassword(newPassword)
        .then(() => ({ success: true }))
        .catch(error => {
            throw new SubmissionError({ _error: error.message });
        });
};

function * changePwdFlow(action) {
    const result = yield call(formSaga, 'change-pwd', changeAccountPwd, action.payload);

    if (result.success) {
        yield put({ type: CHANGE_USER_PASSWORD_SUCCESS });
    } else {
        yield put({ type: CHANGE_USER_PASSWORD_FAILURE });
    }
}

function * watchChangePwd() {
    const task = yield fork(takeLatest, CHANGE_USER_PASSWORD_REQUEST, changePwdFlow);

    yield take(LOCATION_CHANGE);
    yield put(reset('change-email'));
    yield cancel(task);
}

export default [
    watchChangePwd
];
