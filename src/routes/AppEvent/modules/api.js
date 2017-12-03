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
            .then(() => ({ success: true, id: payload.id }))
            .catch(error => ({ error }));
    },
    removeTask: payload => {
        const updates = {};

        updates[`/tasks/${payload.id}`] = null;
        updates[`/events/${payload.eventId}/tasks/${payload.id}`] = null;

        return firebaseDb
            .ref()
            .update(updates)
            .then(() => ({ success: true, id: payload }))
            .catch(error => ({ error }));
    }
};

export default api;
