import React, { Component, PropTypes } from 'react';
import { browserHistory, Router } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { addLocaleData } from 'react-intl';


import IntlContainer from './IntlContainer';

import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';

addLocaleData([...ru, ...en]);

class AppContainer extends Component {
    static propTypes = {
        routes: PropTypes.object.isRequired,
        store : PropTypes.object.isRequired
    };

    shouldComponentUpdate() {
        return false;
    }

    render() {
        const { routes, store } = this.props;

        return (
            <Provider store={store}>
                <IntlContainer>
                    <div style={{ height: '100%' }}>
                        <Router history={browserHistory} children={routes} />
                    </div>
                </IntlContainer>
             </Provider>
        );
    }
}

export default AppContainer;
