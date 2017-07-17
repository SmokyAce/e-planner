import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
// components
import Sidebar from '../Sidebar';
import SidebarContent from '../../containers/SidebarContent';
import Header from '../../../../components/Header';
import { ImmutableLoadingBar as LoadingBar } from 'react-redux-loading-bar';
// style
import './App.scss';


const styles = {
    content: {
        overflowY: 'auto'
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
        const { sidebar, loggedIn, onSetOpen, onSetDocked, children } = this.props;

        const content = <SidebarContent style={{ width: sidebar.get('sidebarWidth') }} />;

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
                <Header loggedIn={loggedIn} />
                <div className='app-container container-fluide'>
                    { children }
                </div>
            </Sidebar>
        );
    }
}

App.propTypes = {
    children   : PropTypes.element,
    sidebar    : PropTypes.instanceOf(Immutable.Map).isRequired,
    loggedIn   : PropTypes.bool.isRequired,
    onSetOpen  : PropTypes.func.isRequired,
    onSetDocked: PropTypes.func.isRequired,
    startSync  : PropTypes.func.isRequired
};

export default App;

