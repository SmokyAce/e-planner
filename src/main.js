import React from 'react';
import ReactDOM from 'react-dom';
import { fromJS } from 'immutable';
import createStore from './store/createStore';
import { createTransform, persistStore } from 'redux-persist-immutable';
import Main from './containers/Main';
// Import translations messages
import { translationMessages } from './i18n';


// ========================================================
// Store Instantiation
// ========================================================
const store = createStore();

// ========================================================
// Persist store
// ========================================================
// transform state func
const transformImmutableState = createTransform(state => state.toJS(), state => fromJS(state), config => config);

// config
const config = {
    transforms: [transformImmutableState],
    whitelist : ['language', 'app'],
    blacklist : ['auth', 'location', 'form', 'restored'],
    debounce  : 1000,
    // storage   : localForage,
    keyPrefix : 'planner:'
};

setTimeout(persistStore, 1000, store, config);

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

let render = messages => {
    const routes = require('./routes').default(store);

    ReactDOM.render(<Main store={store} routes={routes} messages={messages} />, MOUNT_NODE);
};

// This code is excluded from production bundle
if (__DEV__) {
    if (module.hot) {
        // Development render functions
        const renderApp = render;
        const renderError = error => {
            const RedBox = require('redbox-react').default;

            ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
        };

        // Wrap render in try/catch
        render = () => {
            try {
                renderApp(translationMessages);
            } catch (error) {
                renderError(error);
            }
        };

        // Setup hot module replacement
        module.hot.accept('./routes', () =>
            setImmediate(() => {
                ReactDOM.unmountComponentAtNode(MOUNT_NODE);
                render(translationMessages);
            })
        );

        // modules.hot.accept does not accept dynamic dependencies,
        // have to be constants at compile-time
        module.hot.accept('./i18n', () => {
            render(translationMessages);
        });
    }
}

// ========================================================
// Go!
// ========================================================
render(translationMessages);

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (__PROD__) {
    const OfflinePluginRuntime = require('offline-plugin/runtime'); // eslint-disable-line global-require

    OfflinePluginRuntime.install({
        onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
        onUpdated    : () => (window.swUpdate = true)
    });
}
