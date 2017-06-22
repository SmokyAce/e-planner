import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// translations
import LanguageProvider from '../LanguageProvider';

import 'bootstrap-social';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

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
                    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                        <div style={{ height: '100%' }}>
                            <Router history={browserHistory} children={routes} />
                        </div>
                    </MuiThemeProvider>
                </LanguageProvider>
            </Provider>
        );
    }
}

export default AppContainer;
