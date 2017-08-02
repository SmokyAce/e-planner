import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import { Tabs, Tab } from 'material-ui/Tabs';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import FontIcon from 'material-ui/FontIcon';
import messages from './messages';


const recentsIcon = <FontIcon className='material-icons'>restore</FontIcon>;

const AppNavPanel = ({ eventId, services, onChange, value, selectedIndex, select }) => {
    const [...keys] = services.keys();

    keys.unshift('home');

    return (
        <div >
            <Tabs
                onChange={onChange}
                value={value}
            >
                {keys.map((service, index) => {
                    const route = (service === 'home')
                        ? `/app/event/${eventId}`
                        : `/app/event/${eventId}/${service}`;

                    return (
                        <Tab
                            key={service}
                            label={<FormattedMessage {...messages[service]} />}
                            value={index}
                            containerElement={
                                <Link to={route} activeClassName='route--active'>
                                    <FormattedMessage {...messages[service]} />
                                </Link>
                            }
                        />
                    );
                })}
            </Tabs>
            <BottomNavigation
                selectedIndex={selectedIndex}
                style={{ position: 'absolute', bottom: '0px', width: '100%' }}
            >
                {keys.map((service, index) => (
                    <BottomNavigationItem
                        key={index}
                        icon={recentsIcon}
                        label={<FormattedMessage {...messages[service]} />}
                        onTouchTap={() => select(index)}
                    />
                )
                )}
            </BottomNavigation>
        </div>
    );
};

AppNavPanel.propTypes = {
    eventId      : PropTypes.string.isRequired,
    services     : PropTypes.instanceOf(Map).isRequired,
    onChange     : PropTypes.func,
    value        : PropTypes.number,
    selectedIndex: PropTypes.number,
    select       : PropTypes.func
};

export default AppNavPanel;
