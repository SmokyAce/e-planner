import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/createStore';
import App from './containers/App/index';

// Import translations messages
import { translationMessages } from './i18n';

// ========================================================
// Store Instantiation
// ========================================================
const store = createStore();

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

let render = (messages) => {
    const routes = require('./routes/index').default(store);

    ReactDOM.render(
        <App store={store} routes={routes} messages={messages} />,
        MOUNT_NODE
    );
};

// This code is excluded from production bundle
if (__DEV__) {
    if (module.hot) {
        // Development render functions
        const renderApp = render;
        const renderError = (error) => {
            const RedBox = require('redbox-react').default;

            ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
        };

        // Wrap render in try/catch
        render = () => {
            try {
                renderApp();
            } catch (error) {
                renderError(error);
            }
        };

        // Setup hot module replacement
        module.hot.accept('./routes/index', () =>
            setImmediate(() => {
                ReactDOM.unmountComponentAtNode(MOUNT_NODE);
                render();
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
render();
