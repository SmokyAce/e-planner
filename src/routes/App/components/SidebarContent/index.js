import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { List, Map } from 'immutable';
import { createStructuredSelector } from 'reselect';
// import { FormattedMessage } from 'react-intl';

import { makeSelectEventsByIds, makeSelectEventsListOfIds, makeSelectEventsFormState } from '../../modules/selectors';

import TitlePanel from '../TitlePanel';
import AddEvent from './AddEvent';
import Services from './Services';
// import messages from 'messages';
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

const SidebarContent = ({ listOfEventsId, eventsByIds, dispatch, style, formState }) => {
    const sidebarStyle = style ? { ...styles.sidebar, ...style } : styles.sidebar;
    const eventsList = [];

    listOfEventsId.forEach((item) => {
        eventsList.push(
            <div className='input-group'>
                <li key={item} style={styles.sidebarLink}>
                    <Link to={`/app/event/${item}`} activeClassName='route--active'>
                        {eventsByIds.getIn([item, 'name'])}
                    </Link>
                </li>
                <span className='input-group-btn'>
                    <button className='btn btn-link event-btns'>
                        <i className='fa fa-edit fa-fw' />
                    </button>
                    <button className='btn btn-link event-btns'>
                        <i className='fa fa-trash-o fa-lg' />
                    </button>
                </span>
            </div>
        );
    });

    return (
        <TitlePanel style={sidebarStyle}>
            <div style={styles.content} className='text-left'>
                <AddEvent dispatch={dispatch} formState={formState} />
                <Services dispatch={dispatch} formState={formState} />
                <div style={styles.divider} />
                {eventsList}
            </div>
        </TitlePanel>
    );
};

SidebarContent.propTypes = {
    dispatch      : PropTypes.func.isRequired,
    listOfEventsId: PropTypes.instanceOf(List),
    eventsByIds   : PropTypes.instanceOf(Map),
    formState     : PropTypes.instanceOf(Map),
    style         : PropTypes.object
};

const mapStateToProps = state => createStructuredSelector({
    eventsByIds   : makeSelectEventsByIds(),
    listOfEventsId: makeSelectEventsListOfIds(),
    formState     : makeSelectEventsFormState()
});

export default connect(mapStateToProps, null)(SidebarContent);
