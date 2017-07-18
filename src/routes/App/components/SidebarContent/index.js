import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Map, List } from 'immutable';
// import { FormattedMessage } from 'react-intl';

import TitlePanel from '../../components/TitlePanel';
import AddEvent from '../../components/AddEvent';
import IconButton from 'material-ui/IconButton';

import './SidebarContent.scss';


// styles
const styles = {
    sidebar: {
        width : 256,
        height: '100%'
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
    }
};

class SidebarContent extends React.Component {
    shouldComponentUpdate = nextProps => {
        return !this.props.listOfEventsId.equals(nextProps.listOfEventsId) ||
            !this.props.formState.equals(nextProps.formState) ||
            this.props.docked !== nextProps.docked;
    };

    render = () => {
        const { listOfEventsId, eventsByIds, dispatch, style, formState, onSetDocked, docked } = this.props;

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
                <IconButton
                    iconClassName='material-icons'
                    style={styles.iconStyles}
                    tooltip='Закрепить панель'
                    tooltipPosition='top-left'
                    onTouchTap={() => {
                        onSetDocked(docked);
                    }}
                >
                    keyboard_tab
                </IconButton>
                <div style={styles.content} className='text-left'>
                    <AddEvent dispatch={dispatch} formState={formState} />
                    <div style={styles.divider} />
                    {eventsList}
                </div>
            </TitlePanel>
        );
    }
}


SidebarContent.propTypes = {
    dispatch      : PropTypes.func.isRequired,
    listOfEventsId: PropTypes.instanceOf(List),
    eventsByIds   : PropTypes.instanceOf(Map),
    formState     : PropTypes.instanceOf(Map),
    onSetDocked   : PropTypes.func,
    docked        : PropTypes.bool,
    style         : PropTypes.object
};

export default SidebarContent;
