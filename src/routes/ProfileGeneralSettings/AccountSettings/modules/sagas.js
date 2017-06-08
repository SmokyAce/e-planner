// lib
import { cancel, put, take, fork, call, takeLatest, select } from 'redux-saga/effects';
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
import { makeSelectCurrentUserField } from '../../../App/modules/selectors';
// utils
import { firebaseAuth, firebaseDb } from '../../../../utils/firebaseTools';
import formSaga from '../../../../utils/reduxFormSaga';
import { omit } from 'lodash';


function * saveSettings(settings) {
    const uid = yield select(makeSelectCurrentUserField('uid'));
    const updates = {};

    settings.mapKeys((key, value) => {
        if (value !== undefined) {
            updates[`/users/${uid}/${key}`] = value;
        }
    });

    return firebaseDb.ref().update(updates)
        .then(() => {
            omit(settings, ['language', 'sex']);

            return firebaseAuth.currentUser.updateProfile(settings);
        })
        .then(() => ({ success: true }))
        .catch(error => {
            throw new SubmissionError({ _error: error.message });
        });
}

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
