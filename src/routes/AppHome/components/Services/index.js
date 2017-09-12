import React from 'react';
import PropTypes from 'prop-types';
import { allServices } from '../../../App/modules/events';
// components
import { FormattedMessage } from 'react-intl';
import Checkbox from 'material-ui/Checkbox';
// intl
import messages from './messages';


const Services = ({ services }) => {
    return (
        <div>
            <h4><FormattedMessage {...messages.services_desc} /></h4>
            {allServices.map((key, ind) => {
                return (
                    <Checkbox
                        key={ind}
                        checked={services[key]}
                        label={<FormattedMessage {...messages[key]} />}
                    />
                );
            })}
        </div>
    );
};

Services.propTypes = {
    services: PropTypes.object
    // eventId : PropTypes.string.isRequired
};

export default Services;
