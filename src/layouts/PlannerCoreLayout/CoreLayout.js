import React, { Component } from 'react';
import Immutable from 'immutable';
import Sidebar from 'react-sidebar';
import SidebarContent from '../../components/SidebarContent';

import '../../styles/core.scss';
import './PlannerCoreLayout.scss';

import Header from '../../components/Header';

class CoreLayout extends Component {

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
                    <div className='core-layout__viewport container'>
                        { children }
                    </div>
                </Sidebar>
            </div>
        );
    }

}

CoreLayout.propTypes = {
    children : React.PropTypes.element,
    sidebar  : React.PropTypes.instanceOf(Immutable.Map).isRequired,
    onSetOpen: React.PropTypes.func.isRequired
};

export default CoreLayout;
