import React, { Component, PropTypes } from 'react';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import { addLocaleData } from 'react-intl';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

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
                    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                        <div style={{ height: '100%' }}>
                            <Router history={browserHistory} children={routes} />
                        </div>
                    </MuiThemeProvider>
                </IntlContainer>
             </Provider>
        );
    }
}

export default AppContainer;
