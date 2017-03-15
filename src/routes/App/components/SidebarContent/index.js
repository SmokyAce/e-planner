import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Immutable from 'immutable';
import { createStructuredSelector } from 'reselect';
// import { FormattedMessage } from 'react-intl';

import { makeSelectEvents, makeSelectListOfEventsId } from '../../modules/selectors';

import TitlePanel from '../TitlePanel';
import AddEvent from './AddEvent';
// import messages from 'messages';

// styles
const styles = {
    sidebar: {
        width: 300
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
        height         : '100%',
        backgroundColor: 'white'
    }
};

const SidebarContent = ({ listOfEventsId, events, dispatch }) => {
    const eventsList = [];

    listOfEventsId.forEach((item) => {
        eventsList.push(
            <a key={item} style={styles.sidebarLink}>
                <Link to={`/app/event/${item}`} activeClassName='route--active'>
                    {events.getIn([item, 'name'])}
                </Link>
            </a>);
    });
    // <a key={item} href='#' style={styles.sidebarLink}>{events.getIn([item, 'name'])}</a>);

    return (
        <TitlePanel>
            <div style={styles.content} className='text-left'>
                <AddEvent dispatch={dispatch} />
                <div style={styles.divider} />
                {eventsList}
            </div>
        </TitlePanel>
    );
};

SidebarContent.propTypes = {
    dispatch      : React.PropTypes.func.isRequired,
    listOfEventsId: React.PropTypes.instanceOf(Immutable.List),
    events        : React.PropTypes.instanceOf(Immutable.Map)
};

const mapStateToProps = state => createStructuredSelector({
    events        : makeSelectEvents(),
    listOfEventsId: makeSelectListOfEventsId()
});

export default connect(mapStateToProps, null)(SidebarContent);
