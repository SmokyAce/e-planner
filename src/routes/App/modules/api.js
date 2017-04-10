import { normalize } from 'normalizr';
import * as schema from './schema';
import firebaseTools from '../../../utils/firebaseTools';
import auth from '../../../utils/auth';


const api = {

    fetchUserData: () => {
        const uid = auth.getUserUID().uid;

        return firebaseTools.getDatabaseReference(`/users/${uid}`).once('value')
            .then(snapshot => {
                // normalized data with users schema to put in redux store
                return snapshot.val() === null ? null : snapshot.val();
            })
            .catch(error => console.log(error.message));
    },
    setUserData: (userData) => {
        const normalazedData = normalize(userData, schema.users);

        return firebaseTools.getDatabaseReference(`/users/${normalazedData.result}`)
            .set(normalazedData.entities.users[normalazedData.result])
            .then(() => true)
            .catch((error) => {
                console.log(error.message);
                return false;
            });
    }
};

export default api;
