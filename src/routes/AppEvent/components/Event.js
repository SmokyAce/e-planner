import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Map } from 'immutable';

import { makeSelectEventsByIds } from '../../App/modules/selectors';
import AppNavPanel from './AppNavPanel';


const AppEvent = ({ children, params, eventsByIds }) => {
    const services = eventsByIds.getIn([params.id, 'services']);

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
