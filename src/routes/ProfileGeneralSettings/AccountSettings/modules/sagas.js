// lib
import { cancel, put, take, fork, call, takeLatest, select } from 'redux-saga/effects';
import { SubmissionError, reset } from 'redux-form';
// actions
import * as userActions from '../../../App/modules/user';
import { LOCATION_CHANGE } from '../../../../store/reducers/location';
// selectors
import { makeSelectCurrentUserField } from '../../../App/modules/selectors';
// utils
import { firebaseAuth, firebaseDb } from '../../../../utils/firebaseTools';
import formSaga from '../../../../store/middlewares/reduxFormSaga';
import { pick } from 'lodash';


function saveSettings(settings) {
    const updates = {};

    settings.mapKeys((key, value) => {
        if (value !== undefined) {
            updates[`/users/${settings.uid}/${key}`] = value;
        }
    });

    return firebaseDb.ref().update(updates)
        .then(() => {
            pick(settings, ['displayName', 'photoURL']);

            return firebaseAuth.currentUser.updateProfile(settings);
        })
        .then(() => ({ success: true }))
        .catch(error => {
            throw new SubmissionError({ _error: error.message });
        });
}

function * saveUserSettings(action) {
    yield put(userActions.saveUserDataAction('request'));

    action.payload.uid = yield select(makeSelectCurrentUserField('uid'));

    const result = yield call(formSaga, 'account-settings', saveSettings, action.payload);

    if (result.success) {
        yield put(userActions.saveUserDataAction('success'));
    } else {
        yield put(userActions.saveUserDataAction('failure'));
    }
}

function * watchSaveUserSettings() {
    const task = yield fork(takeLatest, userActions.type.SAVE_USER_DATA, saveUserSettings);

    yield take(LOCATION_CHANGE);
    yield put(reset('account-settings'));
    yield cancel(task);
}

export default [
    watchSaveUserSettings
];
