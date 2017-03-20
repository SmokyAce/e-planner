import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Immutable from 'immutable';
import { createStructuredSelector } from 'reselect';
// import { FormattedMessage } from 'react-intl';

import { makeSelectEventsByIds, makeSelectEventsListOfIds } from '../../modules/selectors';

import TitlePanel from '../TitlePanel';
import AddEvent from './AddEvent';
// import messages from 'messages';

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
        textDecoration: 'none'
    },
    divider: {
        margin         : '8px 0',
        height         : 1,
        backgroundColor: '#008cba'
    },
    content: {
        padding        : '5px',
        backgroundColor: 'white'
    }
};

const SidebarContent = ({ listOfEventsId, eventsByIds, dispatch, style }) => {
    const sidebarStyle = style ? { ...styles.sidebar, ...style } : styles.sidebar;

    const eventsList = [];

    listOfEventsId.forEach((item) => {
        eventsList.push(
            <a key={item} style={styles.sidebarLink}>
                <Link to={`/app/event/${item}`} activeClassName='route--active'>
                    {eventsByIds.getIn([item, 'name'])}
                </Link>
            </a>);
    });
    // <a key={item} href='#' style={styles.sidebarLink}>{events.getIn([item, 'name'])}</a>);

    return (
        <TitlePanel style={sidebarStyle}>
            <div style={styles.content} className='text-left'>
                <AddEvent dispatch={dispatch} />
                <div style={styles.divider} />
                {eventsList}
            </div>
        </TitlePanel>
    );
};

SidebarContent.propTypes = {
    dispatch      : PropTypes.func.isRequired,
    listOfEventsId: PropTypes.instanceOf(Immutable.List),
    eventsByIds   : PropTypes.instanceOf(Immutable.Map),
    style         : PropTypes.object
};

const mapStateToProps = state => createStructuredSelector({
    eventsByIds   : makeSelectEventsByIds(),
    listOfEventsId: makeSelectEventsListOfIds()
});

export default connect(mapStateToProps, null)(SidebarContent);
