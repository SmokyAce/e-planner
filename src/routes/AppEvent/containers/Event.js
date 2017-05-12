import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Map } from 'immutable';

import { makeSelectEventsByIds } from '../../App/modules/selectors';
import AppNavPanel from '../components/AppNavPanel';


const AppEvent = ({ children, params, eventsByIds }) => {
    if (eventsByIds.size === 0) {
        return <div>Loading ...</div>;
    }

    const services = eventsByIds.getIn([params.id, 'services']).filter(isChecked => isChecked);

    return (
        <div>
            <AppNavPanel eventId={params.id} services={services} />
            <br />
            { children }
        </div>

    );
};

AppEvent.propTypes = {
    children   : PropTypes.element,
    params     : PropTypes.object,
    eventsByIds: PropTypes.instanceOf(Map)
};

const mapStateToProps = (state) => createStructuredSelector({
    eventsByIds: makeSelectEventsByIds()
});


export default connect(mapStateToProps, null)(AppEvent);
