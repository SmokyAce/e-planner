import React from 'react';
import PropTypes from 'prop-types';
import { Map, List as imList } from 'immutable';
// components
import { Link } from 'react-router';
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
        width    : 256,
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
    content: {
        padding: '5px'
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
        return !this.props.listOfEventsId.equals(nextProps.listOfEventsId) ||
            this.props.sidebarDocked !== nextProps.sidebarDocked ||
            this.props.sidebarPullRight !== nextProps.sidebarPullRight;
    };

    render = () => {
        const {
            listOfEventsId, eventsByIds, style,
            dockedSidebar, sidebarDocked,
            pullRightSidebar, sidebarPullRight,
            openSidebar, sidebarOpened
        } = this.props;
        const sidebarStyle = style ? { ...styles.sidebar, ...style } : styles.sidebar;
        const nestedList = [];

        listOfEventsId.map((item) => {
            nestedList.push(
                <ListItem
                    key={item}
                    primaryText={eventsByIds.getIn([item, 'name'])}
                    containerElement={
                        <Link to={`/app/event/${item}`} activeClassName='route--active'>
                            {eventsByIds.getIn([item, 'name'])}
                        </Link>
                    }
                    onTouchTap={() => (!sidebarDocked && openSidebar(sidebarOpened))}
                />
            );
        });


        return (
            <TitlePanel style={sidebarStyle}>
                <div style={styles.content} className='text-left'>
                    <List>
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
                                            defaultToggled={sidebarDocked}
                                            onToggle={() => dockedSidebar(sidebarDocked)}
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
                                            defaultToggled={sidebarPullRight}
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
                        />
                        <ListItem
                            primaryText={<FormattedMessage {...messages.contractors_description} />}
                            leftIcon={<ContractorsIcon />}
                            containerElement={<Link to={'/app/contractors'} />}
                        />
                    </List>
                </div>
            </TitlePanel>
        );
    }
}


SidebarContent.propTypes = {
    listOfEventsId  : PropTypes.instanceOf(imList),
    eventsByIds     : PropTypes.instanceOf(Map),
    dockedSidebar   : PropTypes.func,
    pullRightSidebar: PropTypes.func,
    openSidebar     : PropTypes.func,
    sidebarDocked   : PropTypes.bool,
    sidebarPullRight: PropTypes.bool,
    sidebarOpened   : PropTypes.bool,
    style           : PropTypes.object
};

export default SidebarContent;
