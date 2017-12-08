import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
import { isEqual } from 'lodash';
// components
import Sidebar from '../Sidebar';
import SidebarContent from '../../components/SidebarContent';
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

    shouldComponentUpdate = (nextState) => (!isEqual(nextState, this.props));

    render = () => {
        // console.log('App render!');
        const {
            children, sidebar, loggedIn, eventsByIds, listOfEventsId,
            connection, onSetOpen, onSetDocked, onChangeSide, currentPage
        } = this.props;

        const content = (
            <SidebarContent
                style={{ width: sidebar.get('sidebarWidth') }}
                eventsByIds={eventsByIds}
                listOfEventsId={listOfEventsId}
                dockedSidebar={onSetDocked}
                sidebarDocked={sidebar.get('sidebarDocked')}
                pullRightSidebar={onChangeSide}
                sidebarPullRight={sidebar.get('pullRight')}
                openSidebar={onSetOpen}
                sidebarOpened={sidebar.get('open')}
            />
        );

        const sidebarProps = {
            sidebar         : content,
            sidebarClassName: 'custom-sidebar-class',
            docked          : sidebar.get('sidebarDocked'),
            open            : sidebar.get('sidebarOpen'),
            pullRight       : sidebar.get('pullRight'),
            onSetOpen,
            onSetDocked,
            styles
        };

        return (
            <Sidebar {...sidebarProps}>
                <LoadingBar style={styles.loadingBar} />
                <Header
                    loggedIn={loggedIn}
                    onMenuIconButtonTouchTap={() => onSetOpen(true)}
                    style={styles.header}
                    currentPage={currentPage}
                    connection={connection}
                />
                <div className='app-container'>
                    {children}
                </div>
            </Sidebar>
        );
    }
}

App.propTypes = {
    children      : PropTypes.element,
    sidebar       : PropTypes.instanceOf(Map).isRequired,
    loggedIn      : PropTypes.bool.isRequired,
    listOfEventsId: PropTypes.instanceOf(List),
    eventsByIds   : PropTypes.instanceOf(Map),
    connection    : PropTypes.string.isRequired,
    onSetOpen     : PropTypes.func.isRequired,
    onSetDocked   : PropTypes.func.isRequired,
    onChangeSide  : PropTypes.func.isRequired,
    startSync     : PropTypes.func.isRequired,
    currentPage   : PropTypes.string.isRequired
};

export default App;

