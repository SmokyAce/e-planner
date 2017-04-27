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
            .catch(error => error);
    },
    addEvent: (payload) => {
        const eventId = firebaseDb.ref().child('events').push().key;

        const newEvent = {
            id      : eventId,
            services: {
                counter    : true,
                guests     : true,
                todos      : true,
                budjet     : false,
                timing     : false,
                contractors: false,
                blog       : false,
                quiz       : false,
                notebook   : false
            }
        };

        const uid = auth.getUserUID().uid;

        const updates = {};

        updates[`/events/${eventId}`] = { ...newEvent, ...payload };
        updates[`/users/${uid}/events/${eventId}`] = true;

        return firebaseDb.ref().update(updates)
            .then(() => {
                return { ...newEvent, ...payload };
            })
            .catch(error => error);
    },
    fetchUserEvents: () => {
        const uid = auth.getUserUID().uid;

        return firebaseDb.ref(`/users/${uid}/events`).once('value')
            .then(snapshot => {
                // normalized data with users schema to put in redux store
                return snapshot.val() === null ? null : snapshot.val();
            })
            .catch(error => error);
    },
    fetchEvents: () => {
        const uid = auth.getUserUID().uid;

        return firebaseDb.ref(`/users/${uid}/events`).once('value')
            .then(snapshot => {
                const eventsIds = snapshot.val();

                if (eventsIds === null) return null;
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

                if (values === null) return events;
                values.forEach(snapshot => {
                    const event = snapshot.val();

                    events.result.push(event.id);
                    events.response[event.id] = event;
                });
                return events;
            })
            .catch(error => error);
    }
};

export default api;
