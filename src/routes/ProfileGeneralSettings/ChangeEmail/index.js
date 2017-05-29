import ChangeEmail from './containers/ChangeEmail';
import { getAsyncInjectors } from '../../../utils/asyncInjectors';


const changeEmail = (store) => {
    const { injectSagas } = getAsyncInjectors(store);

    return ({
        path: 'change-email',
        getComponent(nextState, next) {
            injectSagas(require('./modules/sagas').default);

            next(null, ChangeEmail);
        }
    });
};

export default changeEmail;
