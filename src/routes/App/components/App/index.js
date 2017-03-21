import React from 'react';
import Immutable from 'immutable';

import Sidebar from '../Sidebar';
import SidebarContent from '../SidebarContent';
import Header from '../../../../components/Header';
import './App.scss';


class App extends React.Component {

    render = () => {
        const { sidebar, onSetOpen, onSetDocked, children } = this.props;

        const content = <SidebarContent style={{ width: sidebar.get('sidebarWidth') }} />;

        const sidebarProps = {
            sidebar         : content,
            sidebarClassName: 'custom-sidebar-class',
            docked          : sidebar.get('sidebarDocked'),
            open            : sidebar.get('sidebarOpen'),
            pullRight       : sidebar.get('pullRight'),
            onSetOpen,
            onSetDocked
        };

        return (
            <Sidebar {...sidebarProps}>
                <Header>{ children }</Header>
                <div className='app-container container-fluide'>
                    { children }
                </div>
            </Sidebar>
        );
    }

}

App.propTypes = {
    children   : React.PropTypes.element,
    sidebar    : React.PropTypes.instanceOf(Immutable.Map).isRequired,
    onSetOpen  : React.PropTypes.func.isRequired,
    onSetDocked: React.PropTypes.func.isRequired
};

export default App;

