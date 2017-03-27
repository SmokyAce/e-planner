import SettingsContainer from './containers/SettingsContainer';


export default (store) => {
    return ({
        path     : 'settings',
        component: SettingsContainer
    });
};
