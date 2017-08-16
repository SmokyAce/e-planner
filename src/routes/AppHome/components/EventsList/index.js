import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
// components
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
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
                    style={{ margin: '0px 10px 10px 10px', zIndex: '0' }}
                    initiallyExpanded
                    className='card'
                >
                    <CardHeader
                        title={<Link to=''>{eventsByIds.getIn([eventId, 'name'])}</Link>}
                        actAsExpander
                        showExpandableButton
                    />
                    <CardText expandable style={{ maxWidth: '360px' }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
                            label={<FormattedMessage {...messages.delete_btn} />}
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
