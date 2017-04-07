import { normalize } from 'normalizr';
import { usersSchema } from './schema';
import firebaseTools from '../../../utils/firebaseTools';
import auth from '../../../utils/auth';


const api = {

    fetchUserData: () => {
        const uid = auth.getUserUID().uid;

        return firebaseTools.getDatabaseReference(`/users/${uid}`).once('value')
            .then(snapshot => snapshot.val())
            .catch(error => console.log(error.message));
    },
    setUserData: (userInfo) => {
        console.log(userInfo);
        const normalizedData = normalize(userInfo.toJSON(), usersSchema);

        console.log(normalizedData);
    }
};

export default api;
