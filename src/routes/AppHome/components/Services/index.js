import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Checkbox from 'material-ui/Checkbox';
import messages from './messages';


const Services = ({ services }) => {
    return (
        <div>
            <h4><FormattedMessage {...messages.services_desc} /></h4>
            {Object.keys(services).map((key, ind) => {
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
