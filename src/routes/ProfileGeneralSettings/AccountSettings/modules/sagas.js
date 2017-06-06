// lib
import { cancel, put, take, fork, call, takeLatest } from 'redux-saga/effects';
import { SubmissionError, reset } from 'redux-form';
// action types
import {
    SAVE_USER_DATA,
    SAVE_USER_DATA_REQUEST,
    SAVE_USER_DATA_SUCCESS,
    SAVE_USER_DATA_FAILURE
} from '../../../App/modules/users/actions';
import { LOCATION_CHANGE } from '../../../../store/reducers/location';
// selectors
// import { makeSelectCurrentUserField } from '../../../App/modules/selectors';
// utils
import { firebaseAuth } from '../../../../utils/firebaseTools';
import formSaga from '../../../../utils/reduxFormSaga';


const saveSettings = (settings) => {
    const User = firebaseAuth.currentUser;

    const profile = {
        displayName: settings.get('displayName'),
        photoURL   : settings.get('photoURL')
    };

    return User.updateProfile(profile)
        // .then(() => {
        //     // success update profile, so we can update settings in db
        //     const uid = select(makeSelectCurrentUserField('uid'));

        //     const updates = {};
        //     settings.map(value => {
        //         updates[`/users/${uid}/`] = value;
        //     })
        // })
        .then(() => ({ success: true }))
        .catch(error => {
            throw new SubmissionError({ _error: error.message });
        });
};

function * saveUserSettings(action) {
    yield put({ type: SAVE_USER_DATA_REQUEST });

    const result = yield call(formSaga, 'account-settings', saveSettings, action.payload);

    if (result.success) {
        yield put({ type: SAVE_USER_DATA_SUCCESS });
    } else {
        yield put({ type: SAVE_USER_DATA_FAILURE });
    }
}

function * watchSaveUserSettings() {
    const task = yield fork(takeLatest, SAVE_USER_DATA, saveUserSettings);

    yield take(LOCATION_CHANGE);
    yield put(reset('account-settings'));
    yield cancel(task);
}

export default [
    watchSaveUserSettings
];
