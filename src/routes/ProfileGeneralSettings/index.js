import { getAsyncInjectors } from '../../utils/asyncInjectors';
import form from '../../containers/Form/modules';

import AccountSettings from './containers/AccountSettings';
import ChangePwd from './containers/ChangePwd';
import ChangeEmail from './containers/ChangeEmail';


// Sync route definition
export const accountSettings = (store) => ({
    component: AccountSettings
});

export const changeEmail = (store) => {
    // create reusable async injectors using getAsyncInjectors factory
    const { injectReducer } = getAsyncInjectors(store);

    return ({
        path: 'change-email',
        getComponent(nextState, cb) {
            injectReducer('form', form);

            cb(null, ChangeEmail);
        }
    });
};

export const changePwd = (store) => {
    // create reusable async injectors using getAsyncInjectors factory
    const { injectReducer } = getAsyncInjectors(store);

    return ({
        path: 'change-pwd',
        getComponent(nextState, cb) {
            injectReducer('form', form);

            cb(null, ChangePwd);
        }
    });
};
