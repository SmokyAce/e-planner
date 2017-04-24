import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Map } from 'immutable';
import { createStructuredSelector } from 'reselect';
// import { FormattedMessage } from 'react-intl';

import { makeSelectEventsByIds, makeSelectEventsListOfIds, makeSelectEventsFormState } from '../../modules/selectors';
import { fetchEvent } from '../../modules/events/actions';
import TitlePanel from '../../components/TitlePanel';
import AddEvent from '../../components/AddEvent';
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

class SidebarContent extends React.Component {

    componentDidMount = () => {
        if (this.props.listOfEventsId.size === 0) {
            this.props.dispatch(fetchEvent());
        }
    };

    shouldComponentUpdate = nextProps => {
        return true; // !this.listOfEventsId.equals(nextProps.listOfEventsId);
    };

    render = () => {
        const { listOfEventsId, eventsByIds, dispatch, style, formState } = this.props;

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
    listOfEventsId: PropTypes.instanceOf(Map),
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
