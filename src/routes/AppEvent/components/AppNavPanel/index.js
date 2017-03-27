import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import messages from './messages';


const AppNavPanel = ({ eventId, services }) => {
    const [...keys] = services.keys();

    keys.unshift('home');

    return (
        <div className='app-nav-panel'>
            <ul className='nav nav-tabs'>
                { keys.map((service) => {
                    const route = (service === 'home')
                        ? `/app/event/${eventId}`
                        : `/app/event/${eventId}/${service}`;

                    return (
                        <li key={service}>
                            <Link to={route} activeClassName='route--active'>
                                <FormattedMessage {...messages[service]} />
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
    services: PropTypes.instanceOf(Map).isRequired
};

export default AppNavPanel;
