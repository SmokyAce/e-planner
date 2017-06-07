import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
// translations
import LanguageProvider from '../LanguageProvider';

import 'bootstrap-social';


class AppContainer extends React.Component {
    static propTypes = {
        routes  : PropTypes.object.isRequired,
        store   : PropTypes.object.isRequired,
        messages: PropTypes.object
    };

    shouldComponentUpdate = () => false;

    render() {
        const { routes, store, messages } = this.props;

        return (
            <Provider store={store}>
                <LanguageProvider messages={messages}>
                    <div style={{ height: '100%' }}>
                        <Router history={browserHistory} children={routes} />
                    </div>
                </LanguageProvider>
            </Provider>
        );
    }
}

export default AppContainer;
