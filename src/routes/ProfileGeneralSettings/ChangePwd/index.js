import ChangePwd from './containers/ChangePwd';
import { getAsyncInjectors } from '../../../utils/asyncInjectors';


export const changePwd = (store) => {
    const { injectSagas } = getAsyncInjectors(store);

    return ({
        path: 'change-pwd',
        getComponent(nextState, next) {
            injectSagas(require('./modules/sagas').default);

            next(null, ChangePwd);
        }
    });
};

export default changePwd;
