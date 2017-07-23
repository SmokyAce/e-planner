import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
// components
import { FormattedMessage } from 'react-intl';
import Spinner from '../../../components/Spinner';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import EventsList from './EventList';
// intl
import messages from './messages';
// styles
import './AppHome.scss';


const style = {
    spinner: {
        width    : '60px',
        height   : '60px',
        position : 'absolute',
        top      : '50%',
        left     : '50%',
        transform: 'translate(-50%, -50%)'
    }
};

export const AppHome = props => {
    const { restored, eventsByIds } = props;

    if (!restored) {
        return (
            <div style={{ position: 'relative', height: '200px' }}>
                <Spinner style={style.spinner} />
            </div>
        );
    }

    return (
        <div>
            <div className=''>
                <h2><FormattedMessage {...messages.greeting} /></h2>
                <EventsList eventsByIds={eventsByIds} />
            </div>
            <FloatingActionButton className='add-event-btn'>
                <ContentAdd />
            </FloatingActionButton>
        </div>
    );
};

AppHome.propTypes = {
    restored   : PropTypes.bool.isRequired,
    eventsByIds: PropTypes.instanceOf(Map)
};

export default AppHome;
