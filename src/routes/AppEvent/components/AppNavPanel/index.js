import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import messages from './messages';


const AppNavPanel = ({ eventId, services }) => {
    return (
        <div className='app-nav-panel'>
            <ul className='nav nav-tabs'>
                { services.unshift('Home').map((service) => {
                    const route = (service === 'Home')
                        ? `/app/event/${eventId}`
                        : `/app/event/${eventId}/${service.toLowerCase()}`;

                    return (
                        <li key={service}>
                            <Link to={route} activeClassName='route--active'>
                                <FormattedMessage {...messages[service.toLowerCase()]} />
                            </Link>
                        </li>
                    );
                })
                }
            </ul>
        </div>
    );
};

AppNavPanel.propTypes = {
    eventId : PropTypes.string.isRequired,
    services: PropTypes.instanceOf(Immutable.List).isRequired
};

export default AppNavPanel;
