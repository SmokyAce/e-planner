import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import Checkbox from './Checkbox';
import { toggleEventService } from '../../App/modules/events';


const Services = ({ dispatch, services, eventId, messages }) => {
    const onChange = (service) => {
        dispatch(toggleEventService(eventId, service, !services[service]));
    };

    return (
        <div>
            <h4><FormattedMessage {...messages.sectionServices} /></h4>
            { Object.keys(services).map((key, ind) => {
                return (
                    <Checkbox isChecked={services[key]} value={key} onChange={onChange} key={ind} messages={messages} />
                );
            })}
        </div>
    );
};

Services.propTypes = {
    dispatch: PropTypes.func.isRequired,
    services: PropTypes.object,
    messages: PropTypes.object.isRequired,
    eventId : PropTypes.string.isRequired
};

export default Services;
