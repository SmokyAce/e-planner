import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import messages from './messages';


const AppNavPanel = ({ params }) => {
    const services = ['Home', 'Counter', 'Zen', 'Todos'];

    return (
        <div className='app-nav-panel'>
            <ul className='nav nav-tabs'>
                { services.map((service) => {
                    const route = (service === 'Home')
                        ? `/app/event/${params.id}`
                        : `/app/event/${params.id}/${service.toLowerCase()}`;

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
    params: React.PropTypes.object.isRequired
};

export default AppNavPanel;
