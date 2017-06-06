import { normalize } from 'normalizr';
import * as schema from './schema';
import { firebaseDb } from '../../../utils/firebaseTools';
import auth from '../../../utils/auth';


const api = {

    fetchUserData: () => {
        const uid = auth.getUserUID().uid;

        return firebaseDb.ref(`/users/${uid}`).once('value')
            .then(snapshot => {
                // normalized data with users schema to put in redux store
                return snapshot.val() === null ? null : snapshot.val();
            })
            .catch(error => console.log(error.message));
    },
    setUserData: (userData) => {
        const normalazedData = normalize(userData, schema.users);

        return firebaseDb.ref(`/users/${normalazedData.result}`)
            .set(normalazedData.entities.users[normalazedData.result])
            .then(() => true)
            .catch(error => {
                return { error };
            });
    },
    addEvent: (payload) => {
        const uid = auth.getUserUID().uid;

        const updates = {};

        updates[`/events/${payload.id}`] = { ...payload };
        updates[`/users/${uid}/events/${payload.id}`] = true;

        return firebaseDb.ref().update(updates)
            .then(() => ({ success: true, id: payload.id }))
            .catch(error => ({ error }));
    },
    fetchUserEvents: () => {
        const uid = auth.getUserUID().uid;

        return firebaseDb.ref(`/users/${uid}/events`).once('value')
            .then(snapshot => snapshot.val())
            .catch(error => ({ error }));
    },
    fetchEvents: () => {
        return api.fetchUserEvents()
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
                return events;
            })
            .catch(error => ({ error }));
    }
};

export default api;
