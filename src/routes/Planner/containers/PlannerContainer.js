import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import './SideBar.scss';

//import Header from '../../../components/Header';
//import '../../../components/Header/Header.scss'

class Planner extends Component {

    componentWillMount() {
        const mql = window.matchMedia('(min-width: 800px)');

        mql.addListener(this.mediaQueryChanged);
        this.setState({ mql, sidebarDocked: mql.matches });
    }

    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
    }

    mediaQueryChanged() {
        this.setState({ sidebarDocked: this.state.mql.matches });
    }

    onSetSidebarOpen = (open) => {
        this.setState({ sidebarOpen: open });
    };

    render() {
        const sidebarContent = <b>Events................................................</b>;
        const sidebarOpen = true;
        const sidebarDocked = true;

        return (
            <div>

                <Sidebar sidebar={sidebarContent}
                    open={sidebarOpen}
                    docked={sidebarDocked}
                    onSetOpen={this.onSetSidebarOpen}
                />
            </div>
        );
    }
}

export default Planner;

