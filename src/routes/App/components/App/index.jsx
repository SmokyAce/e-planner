import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
import { isEqual } from 'lodash';
// theme
import { getThemeSource, themes } from './themes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// components
import Sidebar from '../Sidebar';
import Header from '../../../../components/Header';
import { ImmutableLoadingBar as LoadingBar } from 'react-redux-loading-bar';
// style
import './App.scss';

const styles = {
    root: {
        position: 'fixed'
    },
    sidebar: {
        zIndex         : '1101',
        backgroundColor: '#f2f2f2'
    },
    content: {
        overflowY      : 'auto',
        backgroundColor: '#f2f2f2',
        display        : 'flex',
        flexDirection  : 'column'
    },
    loadingBar: {
        zIndex: 1101,
        height: '2px'
    },
    header: {}
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.props.startSync();
    }

    shouldComponentUpdate = nextProps => !isEqual(nextProps, this.props);

    render = () => {
        __DEV__ && console.log('App render!');
        const { children, loggedIn, eventsByIds, listOfEventsId, connection, currentPage, theme } = this.props;
        const { onSetDocked, onChangeSide, onSetOpen, browserLessThanMedium } = this.props;

        const sidebar = this.props.sidebar.toJS();

        sidebar.hide = browserLessThanMedium;

        const sidebarProps = {
            ...sidebar,
            onSetDocked,
            onChangeSide,
            onSetOpen,
            eventsByIds,
            listOfEventsId
        };

        return (
            <MuiThemeProvider muiTheme={getMuiTheme(getThemeSource(theme, themes))}>
                <Sidebar {...sidebarProps}>
                    <LoadingBar style={styles.loadingBar} />
                    <Header
                        loggedIn={loggedIn}
                        onMenuIconButtonTouchTap={() => onSetOpen(!sidebar.open)}
                        style={styles.header}
                        currentPage={currentPage}
                        connection={connection}
                    />
                    <div className='app-container'>{children}</div>
                </Sidebar>
            </MuiThemeProvider>
        );
    };
}

App.propTypes = {
    children             : PropTypes.element,
    loggedIn             : PropTypes.bool.isRequired,
    listOfEventsId       : PropTypes.instanceOf(List),
    eventsByIds          : PropTypes.instanceOf(Map),
    connection           : PropTypes.string.isRequired,
    startSync            : PropTypes.func.isRequired,
    currentPage          : PropTypes.string.isRequired,
    browserLessThanMedium: PropTypes.bool,
    sidebar              : PropTypes.instanceOf(Map),
    onSetDocked          : PropTypes.func,
    onChangeSide         : PropTypes.func,
    onSetOpen            : PropTypes.func
};

export default App;
