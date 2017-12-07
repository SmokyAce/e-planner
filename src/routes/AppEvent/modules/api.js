// import { normalize } from 'normalizr';
// import * as schema from './schema';
import { firebaseDb } from '../../../utils/firebaseTools';

const api = {
    addTask: payload => {
        const updates = {};

        updates[`/tasks/${payload.id}`] = { ...payload };
        updates[`/events/${payload.eventId}/tasks/${payload.id}`] = true;

        return firebaseDb
            .ref()
            .update(updates)
            .then(() => ({ success: true, payload }))
            .catch(error => ({ error }));
    },
    removeTask: payload => {
        const updates = {};

        updates[`/tasks/${payload.id}`] = null;
        updates[`/events/${payload.eventId}/tasks/${payload.id}`] = null;

        return firebaseDb
            .ref()
            .update(updates)
            .then(() => ({ success: true, payload }))
            .catch(error => ({ error }));
    },
    toggleTask: payload => {
        const updates = {};

        updates[`/tasks/${payload.id}/completed`] = !payload.completed;

        return firebaseDb
            .ref()
            .update(updates)
            .then(() => ({ success: true, payload }))
            .catch(error => ({ error }));
    }
};

export default api;
