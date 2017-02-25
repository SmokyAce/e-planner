import React from 'react';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
// translations
import LanguageProvider from '../LanguageProvider';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

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
