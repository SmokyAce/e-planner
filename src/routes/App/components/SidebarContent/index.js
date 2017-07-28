import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
// components
import { Link } from 'react-router';
// import { FormattedMessage } from 'react-intl';
import TitlePanel from '../../components/TitlePanel';
import Toggle from 'material-ui/Toggle';
import Checkbox from 'material-ui/Checkbox';
// styles
import './SidebarContent.scss';


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
    divider: {
        margin         : '8px 0',
        height         : 1,
        backgroundColor: '#008cba'
    },
    content: {
        padding: '5px'
    },
    iconStyles: {
        marginLeft: '200px'
    },
    toggle: {
        padding: '10px 0px 10px 10px',
        width  : '25%'
    },
    checkbox: {
        width: '75%'
    },
    thumbSwitched: {
        backgroundColor: '#2196f3'
    },
    trackSwitched: {
        backgroundColor: '#85c3f5'
    }
};

class SidebarContent extends React.Component {
    shouldComponentUpdate = nextProps => {
        return !this.props.listOfEventsId.equals(nextProps.listOfEventsId) ||
            this.props.docked !== nextProps.docked ||
            this.props.pullRight !== nextProps.pullRight;
    };

    render = () => {
        const { listOfEventsId, eventsByIds, style, onSetDocked, docked, onChangeSide, pullRight } = this.props;

        const sidebarStyle = style ? { ...styles.sidebar, ...style } : styles.sidebar;
        const eventsList = [];

        listOfEventsId.forEach((item) => {
            eventsList.push(
                <div key={item} className='input-group'>
                    <li style={styles.sidebarLink}>
                        <Link to={`/app/event/${item}`} activeClassName='route--active'>
                            {eventsByIds.getIn([item, 'name'])}
                        </Link>
                    </li>
                    <span className='input-group-btn'>
                        <Link to={`/app/event/${item}/settings`} activeClassName='route--active'>
                            <button className='btn btn-link event-btns'>
                                <i className='fa fa-cog fa-fw' />
                            </button>
                        </Link>
                        <Link to={`/app/event/${item}/delete`} activeClassName='route--active'>
                            <button className='btn btn-link event-btns'>
                                <i className='fa fa-trash fa-fw' />
                            </button>
                        </Link>
                    </span>
                </div>
            );
        });

        return (
            <TitlePanel style={sidebarStyle}>
                <div style={styles.content} className='text-left'>
                    <div className='sidebar-prop-cont'>
                        <Checkbox
                            label='Pull right'
                            defaultChecked={pullRight}
                            onCheck={() => onChangeSide(!pullRight)}
                            style={styles.checkbox}
                        />
                        <Toggle
                            style={styles.toggle}
                            defaultToggled={docked}
                            thumbSwitchedStyle={styles.thumbSwitched}
                            trackSwitchedStyle={styles.trackSwitched}
                            onToggle={() => {
                                onSetDocked(docked);
                            }}
                        />
                    </div>
                    <hr />
                    {eventsList}
                </div>
            </TitlePanel>
        );
    }
}


SidebarContent.propTypes = {
    listOfEventsId: PropTypes.instanceOf(List),
    eventsByIds   : PropTypes.instanceOf(Map),
    onSetDocked   : PropTypes.func,
    onChangeSide  : PropTypes.func,
    docked        : PropTypes.bool,
    pullRight     : PropTypes.bool,
    style         : PropTypes.object
};

export default SidebarContent;
