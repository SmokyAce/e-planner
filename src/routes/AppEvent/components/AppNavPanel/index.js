import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import { Tabs, Tab } from 'material-ui/Tabs';
import messages from './messages';


const styles = {
    tabs: {
        overflowY: 'hidden'
        // display  : 'block'
    },
    tab: {
        width       : '80px',
        flex        : '1 1 0%',
        paddingLeft : '10px',
        paddingRight: '10px',
        whiteSpace  : 'normal'
    },
    inkBarStyle: {
        display: 'none'
    }
};

const AppNavPanel = ({ eventId, services, onChange, value }) => {
    return (
        <div >
            <Tabs
                onChange={onChange}
                value={value}
                tabItemContainerStyle={styles.tabs}
                inkBarStyle={styles.inkBarStyle}
                id='event-tabs'
            >
                {services.map((service, index) => {
                    const route = (service === 'home')
                        ? `/app/event/${eventId}`
                        : `/app/event/${eventId}/${service}`;
                    const tabStyle = { ...styles.tab, borderBottom: '2px solid red' };

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
                            style={value === index ? tabStyle : styles.tab}
                        />
                    );
                })}
            </Tabs>
        </div>
    );
};

AppNavPanel.propTypes = {
    eventId : PropTypes.string.isRequired,
    services: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    value   : PropTypes.number
};

export default AppNavPanel;
