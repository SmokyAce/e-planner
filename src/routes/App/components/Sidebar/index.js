import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { Map, List } from 'immutable';
// components
import Sidebar from 'react-sidebar';
import SidebarContent from '../../components/SidebarContent';

import './Sidebar.scss';

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
    }
};

const HOC = Component => {
    class SidebarHOC extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                docked: props.docked
            };
            this.onChangeSidebarDocked = this.onChangeSidebarDocked.bind(this);
        }

        componentWillReceiveProps = nextProps => {
            if (nextProps.hide === this.props.hide) return;

            const { hide, docked } = nextProps;

            if (hide) this.setState({ docked: false });
            if (!hide && docked) this.setState({ docked: true });
        };

        onChangeSidebarDocked() {
            this.props.onSetDocked(!this.state.docked);
            this.setState({ docked: !this.state.docked });
        }

        render() {
            // console.log('Sidebar render!');
            const { eventsByIds, listOfEventsId, widht, pullRight } = this.props;
            const { onChangeSide, onSetOpen } = this.props;

            const content = (
                <SidebarContent
                    style={{ width: `${widht}px` }}
                    eventsByIds={eventsByIds}
                    listOfEventsId={listOfEventsId}
                    dockedSidebar={this.onChangeSidebarDocked}
                    sidebarDocked={this.state.docked}
                    pullRightSidebar={onChangeSide}
                    sidebarPullRight={pullRight}
                    openSidebar={onSetOpen}
                />
            );

            const props = {
                ...this.props,
                sidebar         : content,
                sidebarClassName: 'custom-sidebar-class',
                docked          : this.state.docked,
                styles
            };

            return <Component {...props} />;
        }
    }

    SidebarHOC.propTypes = {
        onChangeSide  : PropTypes.func,
        onSetDocked   : PropTypes.func,
        onSetOpen     : PropTypes.func,
        docked        : PropTypes.bool,
        open          : PropTypes.bool,
        pullRight     : PropTypes.bool,
        hide          : PropTypes.bool,
        widht         : PropTypes.number,
        listOfEventsId: PropTypes.instanceOf(List),
        eventsByIds   : PropTypes.instanceOf(Map)
    };

    return SidebarHOC;
};

export default HOC(Sidebar);
