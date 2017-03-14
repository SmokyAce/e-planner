import React from 'react';
import Immutable from 'immutable';
import Sidebar from 'react-sidebar';

import SidebarContent from '../SidebarContent';
import Header from '../../../../components/Header';
import AppNavPanel from '../AppNavPanel';

import './App.scss';

class App extends React.Component {

    componentWillMount = () => {
        const mql = window.matchMedia('(min-width: 800px)');

        mql.addListener(this.mediaQueryChanged);
        this.setState({ mql, sidebarDocked: mql.matches });
    };

    componentWillUnmount = () => {
        this.state.mql.removeListener(this.mediaQueryChanged);
    };

    mediaQueryChanged = () => {
        this.setState({ sidebarDocked: this.state.mql.matches });
    };

    render = () => {
        const content = <SidebarContent />;

        const { sidebar, onSetOpen, children } = this.props;

        return (
            <div className='text-center'>
                <Sidebar sidebar={content}
                    open={sidebar.get('sidebarOpen')}
                    docked={sidebar.get('sidebarDocked')}
                    onSetOpen={onSetOpen}
                    sidebarClassName='custom-sidebar-class'
                >
                    <Header>{ children }</Header>
                    <div className='app-container container-fluide'>
                        <AppNavPanel />
                        <br />
                        { children }
                    </div>
                </Sidebar>
            </div>
        );
    }

}

App.propTypes = {
    children : React.PropTypes.element,
    sidebar  : React.PropTypes.instanceOf(Immutable.Map).isRequired,
    onSetOpen: React.PropTypes.func.isRequired
};

export default App;

