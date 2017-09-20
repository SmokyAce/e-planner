import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
// components
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import WidjetBudjet from '../Widjets/Budjet';
import WidjetGuests from '../Widjets/Guests';
import WidjetTasks from '../Widjets/Tasks';
// intl
import messages from './messages';
// styles
import './EventsList.scss';


const EventsList = ({ eventsByIds, onDeleteEvent, eventListOfIds }) => (
    <div className='events-cont'>
        {eventListOfIds.map(eventId => {
            return (
                <Card
                    key={eventId}
                    style={{ margin: '10px', zIndex: '0' }}
                    initiallyExpanded
                    className='card text-left'
                >
                    <CardHeader
                        title={<div>
                            <Link to=''>{eventsByIds.getIn([eventId, 'name'])}</Link>
                            <br /><span>Тут будет описание мероприятия...</span>
                        </div>}
                        textStyle={{ paddingRight: '48px' }}
                        actAsExpander
                        showExpandableButton
                    />
                    <CardText expandable className='widjets-box'>
                        <WidjetBudjet />
                        <WidjetGuests />
                        <WidjetTasks />
                    </CardText>
                    <CardActions className='card-actions-cont'>
                        <FlatButton
                            label={
                                <Link to={`/app/event/${eventId}/settings`}>
                                    <FormattedMessage {...messages.settings_btn} />
                                </Link>}
                            style={{ marginLeft: '8px' }}
                        />
                        <FlatButton
                            label={<a><FormattedMessage {...messages.delete_btn} /></a>}
                            onClick={() => onDeleteEvent(eventId)}
                        />
                    </CardActions>
                </Card>
            );
        })}
    </div>
);

EventsList.propTypes = {
    eventsByIds   : PropTypes.instanceOf(Map),
    eventListOfIds: PropTypes.instanceOf(List),
    onDeleteEvent : PropTypes.func
};

export default EventsList;
