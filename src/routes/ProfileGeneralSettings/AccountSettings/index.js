import AccountSettings from './containers/AccountSettings';
import { getAsyncInjectors } from '../../../utils/asyncInjectors';

const accountSettings = (store) => {
    const { injectSagas } = getAsyncInjectors(store);

    return ({
        getComponent(nextState, next) {
            injectSagas(require('./modules/sagas').default);

            next(null, AccountSettings);
        }
    });
};

export default accountSettings;
