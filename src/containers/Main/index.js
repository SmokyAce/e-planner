import React from 'react';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
// translations
import LanguageProvider from '../LanguageProvider';

import 'bootstrap-social';


class AppContainer extends React.Component {
    static propTypes = {
        routes  : React.PropTypes.object.isRequired,
        store   : React.PropTypes.object.isRequired,
        messages: React.PropTypes.object
    };

    shouldComponentUpdate() {
        return false;
    }

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
