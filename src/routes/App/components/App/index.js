import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
// components
import Sidebar from '../Sidebar';
import SidebarContent from '../../components/SidebarContent';
import Header from '../../../../components/Header';
import { ImmutableLoadingBar as LoadingBar } from 'react-redux-loading-bar';
// style
import './App.scss';


const styles = {
    sidebar: {
        zIndex         : '1101',
        backgroundColor: '#f2f2f2'
    },
    content: {
        overflowY      : 'auto',
        backgroundColor: '#f2f2f2'
    },
    loadingBar: {
        zIndex: 1,
        height: '2px'
    }
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.props.startSync();
    }

    render = () => {
        const {
            children, sidebar, loggedIn, eventsByIds,
            listOfEventsId, formState, onSetOpen, onSetDocked, onChangeSide
        } = this.props;

        const content = (
            <SidebarContent
                style={{ width: sidebar.get('sidebarWidth') }}
                eventsByIds={eventsByIds}
                listOfEventsId={listOfEventsId}
                formState={formState}
                onSetDocked={onSetDocked}
                docked={sidebar.get('sidebarDocked')}
                onChangeSide={onChangeSide}
                pullRight={sidebar.get('pullRight')}
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
                />
                <div className='app-container container-fluide'>
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
    formState     : PropTypes.instanceOf(Map),
    onSetOpen     : PropTypes.func.isRequired,
    onSetDocked   : PropTypes.func.isRequired,
    onChangeSide  : PropTypes.func.isRequired,
    startSync     : PropTypes.func.isRequired
};

export default App;

