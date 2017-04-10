import { normalize } from 'normalizr';
import * as schema from './schema';
import firebaseTools from '../../../utils/firebaseTools';
import auth from '../../../utils/auth';


const api = {

    fetchUserData: () => {
        const uid = auth.getUserUID().uid;

        return firebaseTools.getDatabaseReference(`/users/${uid}`).once('value')
            .then(snapshot => {
                console.log(snapshot.val());
                // normalized data with users schema to put in redux store
                return snapshot.val() === null ? null : snapshot.val();
            })
            .catch(error => console.log(error.message));
    },
    setUserData: (userInfo) => {
        console.log(userInfo);
        const normalizedData = normalize(userInfo.toJSON(), schema.users);

        console.log(normalizedData);
    }
};

export default api;
