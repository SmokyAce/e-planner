import React from 'react';
import PropTypes from 'prop-types';
import { Map, List as imList } from 'immutable';
// components
import Link from '../../../../components/Link';
import { FormattedMessage } from 'react-intl';
import TitlePanel from '../../components/TitlePanel';
import Toggle from 'material-ui/Toggle';
// import Checkbox from 'material-ui/Checkbox';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import EventIcon from 'material-ui/svg-icons/action/event';
import ContractorsIcon from 'material-ui/svg-icons/action/compare-arrows';
import SidebarIcon from 'material-ui/svg-icons/action/chrome-reader-mode';
import GuestsIcon from 'material-ui/svg-icons/social/group';
// styles
import './SidebarContent.scss';
// intl
import messages from './messages';

// styles
const styles = {
    sidebar: {
        height   : '100%',
        textAlign: 'left'
    },
    sidebarLink: {
        display       : 'block',
        padding       : '7px 0px',
        color         : '#757575',
        paddingLeft   : '5px',
        textDecoration: 'none'
    },
    toggle_on: {
        backgroundImage: 'url(/img/docked_off.png)'
    },
    toggle_off: {
        backgroundImage: 'url(/img/docked_on.png)'
    }
};

class SidebarContent extends React.Component {
    shouldComponentUpdate = nextProps => {
        return (
            !this.props.listOfEventsId.equals(nextProps.listOfEventsId) ||
            this.props.sidebarDocked !== nextProps.sidebarDocked ||
            this.props.sidebarPullRight !== nextProps.sidebarPullRight
        );
    };

    render = () => {
        const {
            listOfEventsId,
            eventsByIds,
            style,
            dockedSidebar,
            sidebarDocked,
            pullRightSidebar,
            sidebarPullRight,
            openSidebar
        } = this.props;
        const sidebarStyle = style ? { ...styles.sidebar, ...style } : styles.sidebar;
        const nestedList = [];

        const closeSidebar = () => !sidebarDocked && openSidebar(false);

        listOfEventsId.map(item => {
            nestedList.push(
                <ListItem
                    key={item}
                    primaryText={eventsByIds.getIn([item, 'name'])}
                    containerElement={
                        <Link to={`/app/event/${item}/home`} activeClassName='route--active'>
                            {eventsByIds.getIn([item, 'name'])}
                        </Link>
                    }
                    onClick={() => closeSidebar()}
                />
            );
        });

        return (
            <div style={sidebarStyle}>
                <TitlePanel onClick={() => closeSidebar()} />
                <List style={{ paddingTop: '0px' }}>
                    <ListItem
                        primaryText={<FormattedMessage {...messages.sidebar_description} />}
                        leftIcon={<SidebarIcon />}
                        primaryTogglesNestedList
                        nestedListStyle={{ fontWeight: 'inherit' }}
                        nestedItems={[
                            <ListItem
                                key={1}
                                primaryText={<FormattedMessage {...messages.sidebar_docked} />}
                                rightToggle={
                                    <Toggle
                                        toggled={sidebarDocked}
                                        onToggle={() => dockedSidebar()}
                                        thumbSwitchedStyle={styles.toggle_on}
                                        thumbStyle={styles.toggle_off}
                                    />
                                }
                            />,
                            <ListItem
                                key={2}
                                primaryText={<FormattedMessage {...messages.sidebar_pullRight} />}
                                rightToggle={
                                    <Toggle
                                        toggled={sidebarPullRight}
                                        onToggle={() => pullRightSidebar(!sidebarPullRight)}
                                    />
                                }
                            />
                        ]}
                    />
                    <Divider />
                    <ListItem
                        primaryText={<FormattedMessage {...messages.events_description} />}
                        initiallyOpen
                        leftIcon={<EventIcon />}
                        primaryTogglesNestedList
                        nestedItems={nestedList}
                    />
                    <Divider />
                    <ListItem
                        primaryText={<FormattedMessage {...messages.guests_description} />}
                        leftIcon={<GuestsIcon />}
                        containerElement={<Link to={'/app/guests'} />}
                        onClick={() => closeSidebar()}
                    />
                    <ListItem
                        primaryText={<FormattedMessage {...messages.contractors_description} />}
                        leftIcon={<ContractorsIcon />}
                        containerElement={<Link to={'/app/contractors'} />}
                        onClick={() => closeSidebar()}
                    />
                </List>
            </div>
        );
    };
}

SidebarContent.propTypes = {
    listOfEventsId  : PropTypes.instanceOf(imList),
    eventsByIds     : PropTypes.instanceOf(Map),
    dockedSidebar   : PropTypes.func,
    pullRightSidebar: PropTypes.func,
    openSidebar     : PropTypes.func,
    sidebarDocked   : PropTypes.bool,
    sidebarPullRight: PropTypes.bool,
    style           : PropTypes.object
};

export default SidebarContent;
