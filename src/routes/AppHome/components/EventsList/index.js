import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
// components
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
// intl
import messages from './messages';
// styles
import './EventsList.scss';


const EventsList = ({ eventsByIds, onDeleteEvent }) => (
    <div className='events-cont'>
        {eventsByIds.map(event => {
            return (
                <Card
                    key={event.get('id')}
                    style={{ marginBottom: '10px', zIndex: '0' }}
                    initiallyExpanded
                    className='card'
                >
                    <CardHeader
                        title={<Link to=''>{event.get('name')}</Link>}
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
                                <Link to={`/app/event/${event.get('id')}/settings`}>
                                    <FormattedMessage {...messages.settings_btn} />
                                </Link>}
                            style={{ marginLeft: '8px' }}
                        />
                        <FlatButton
                            label={<FormattedMessage {...messages.delete_btn} />}
                            onTouchTap={() => onDeleteEvent(event.get('id'))}
                        />
                    </CardActions>
                </Card>
            );
        })}
    </div>
);

EventsList.propTypes = {
    eventsByIds  : PropTypes.instanceOf(Map),
    onDeleteEvent: PropTypes.func
};

export default EventsList;
