import { normalize } from 'normalizr';
import * as schema from './schema';
import { firebaseDb } from '../../../utils/firebaseTools';
import auth from '../../../utils/auth';

const api = {
    fetchUserData: () => {
        const uid = auth.getUserUID().uid;

        return firebaseDb
            .ref(`/users/${uid}`)
            .once('value')
            .then(snapshot => ({ response: snapshot.val() }))
            .catch(error => ({ error }));
    },
    setUserData: userData => {
        const normalazedData = normalize(userData, schema.users);

        return firebaseDb
            .ref(`/users/${normalazedData.result}`)
            .set(normalazedData.entities.users[normalazedData.result])
            .then(() => ({ success: true }))
            .catch(error => ({ error }));
    },
    addEvent: payload => {
        const uid = auth.getUserUID().uid;

        const updates = {};

        updates[`/events/${payload.id}`] = { ...payload };
        updates[`/users/${uid}/events/${payload.id}`] = true;

        return firebaseDb
            .ref()
            .update(updates)
            .then(() => ({ success: true, id: payload.id }))
            .catch(error => ({ error }));
    },
    removeEventTasks: eventId => {
        return firebaseDb
            .ref('/tasks')
            .orderByChild('eventId')
            .equalTo(eventId)
            .once('value')
            .then(snapshot => {
                const updates = {};

                for (const taskId in snapshot.val()) {
                    if (snapshot.val().hasOwnProperty(taskId)) {
                        updates[`/tasks/${taskId}`] = null;
                    }
                }
                return firebaseDb.ref().update(updates);
            });
    },
    removeEvent: eventId => {
        return api
            .removeEventTasks(eventId)
            .then(() => {
                const uid = auth.getUserUID().uid;

                const updates = {};

                updates[`/events/${eventId}`] = null;
                updates[`/users/${uid}/events/${eventId}`] = null;

                return firebaseDb.ref().update(updates);
            })
            .then(() => ({ success: true, id: eventId }))
            .catch(error => ({ error }));
    },
    fetchUserEvents: () => {
        const uid = auth.getUserUID().uid;

        return firebaseDb
            .ref(`/users/${uid}/events`)
            .once('value')
            .then(snapshot => snapshot.val())
            .catch(error => ({ error }));
    },
    fetchEvents: () => {
        return api
            .fetchUserEvents()
            .then(eventsIds => {
                if (eventsIds === null) return [];
                const promises = [];

                for (const key in eventsIds) {
                    if (eventsIds.hasOwnProperty(key)) {
                        promises.push(firebaseDb.ref(`/events/${key}`).once('value'));
                    }
                }
                return Promise.all(promises);
            })
            .then(values => {
                const events = { result: [], response: {} };

                values.forEach(snapshot => {
                    const event = snapshot.val();

                    events.result.push(event.id);
                    events.response[event.id] = event;
                });
                return { response: events };
            })
            .catch(error => ({ error }));
    }
};

export default api;
