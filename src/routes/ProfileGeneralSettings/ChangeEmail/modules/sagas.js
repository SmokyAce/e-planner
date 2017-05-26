import { takeLatest } from 'redux-saga';
import { cancel, put, take, fork } from 'redux-saga/effects';
import {
    CHANGE_USER_EMAIL_REQUEST,
    CHANGE_USER_EMAIL_SUCCESS,
    CHANGE_USER_EMAIL_FAIRURE
} from '../../../AppAuth/modules/actionTypes';
import { LOCATION_CHANGE } from '../../../../store/reducers/location';
// import { firebaseAuth } from '../../../../utils/firebaseTools';


function* changeEmail(action) {
    try {
        // TODO: make api request to change email
        yield put(CHANGE_USER_EMAIL_SUCCESS);
    } catch (error) {
        yield put(CHANGE_USER_EMAIL_FAIRURE);
    }
}

function* takeLatestChangeEmailRequest() {
    yield takeLatest(CHANGE_USER_EMAIL_REQUEST, changeEmail);
}

function* watchChangeEmail() {
    const task = yield fork(takeLatestChangeEmailRequest);

    yield take(LOCATION_CHANGE);
    yield cancel(task);
}

export default {
    watchChangeEmail
};
