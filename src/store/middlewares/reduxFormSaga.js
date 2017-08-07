import { startSubmit, stopSubmit, SubmissionError } from 'redux-form';
import { put, call } from 'redux-saga/effects';


export default function * formSaga(formId, apiSaga, ...apiSagaArgs) {
    // Start form submit
    yield put(startSubmit(formId));

    try {
        const result = yield call(apiSaga, ...apiSagaArgs);

        // Success
        yield put(stopSubmit(formId));
        return { success: true, result };
    } catch (err) {
        if (err instanceof SubmissionError) {
            yield put(stopSubmit(formId, err.errors));
        } else {
            console.error(err); // eslint-disable-line no-console
            yield put(stopSubmit(formId, { _error: err.message }));
        }
        return { success: false };
    }
}
