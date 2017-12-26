import React from 'react';
import { connect } from 'react-redux';
import Home from '../components/HomeView';

// import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// selectors
import { createStructuredSelector } from 'reselect';
// actions
import { bindActionCreators } from 'redux';
import { loginRequest, loginWithProviderRequest, registerRequest } from '../../AppAuth/modules/actions';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#21a3f6'
    },
    appBar: {
        // height: 64
        // textColor: '#666666'
    }
});

const MuiHome = props => {
    return (
        <MuiThemeProvider muiTheme={muiTheme}>
            <Home {...props} />
        </MuiThemeProvider>
    );
};

const mapStateToProps = state => createStructuredSelector({});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            loginRequest,
            registerRequest,
            loginWithProviderRequest
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(MuiHome);
