import { getAsyncInjectors } from '../../utils/asyncInjectors';
// components
import SettingsLayout from './containers/SettingsContainer';

// Sync route definition
export default store => {
    const { injectSagas } = getAsyncInjectors(store);

    return {
        path: 'settings',
        getComponent(nextState, cb) {
            require.ensure([], require => {
                injectSagas(require('./modules/sagas').default);

                cb(null, SettingsLayout);
            });
        }
    };
};
