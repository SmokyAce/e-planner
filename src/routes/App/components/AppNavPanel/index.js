import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import messages from './messages';


const AppNavPanel = () => {
    const services = ['Home', 'Counter', 'Zen', 'Todos'];

    return (
        <div className='app-nav-panel'>
            <ul className='nav nav-tabs'>
                { services.map((service) => {
                    const route = (service === 'Home') ? '/app' : `/app/${service.toLowerCase()}`;

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

AppNavPanel.propTypes = {};

export default AppNavPanel;
