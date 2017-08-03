import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { browserHistory } from 'react-router';
// components
import SwipeableViews from 'react-swipeable-views';
import AppNavPanel from '../AppNavPanel';
import Spinner from '../../../../components/Spinner';


class AppEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex   : 0,
            selectedIndex: 0
        };

        this.handleChange_ = this.handleChange_.bind(this);
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value
        });
    };

    handleChange_ = (value, services, evId) => {
        // console.log('swipe action', value, services, evId);
        const route = (services[value] === 'home')
            ? `/app/event/${evId}`
            : `/app/event/${evId}/${services[value]}`;

        browserHistory.push(route);
        this.setState({
            slideIndex: value
        });
    }

    render() {
        const { children, params, eventsByIds } = this.props;

        if (eventsByIds.size === 0) {
            return <div>Loading ...</div>;
        }

        const [...services] = eventsByIds.getIn([params.id, 'services']).filter(isChecked => isChecked).keys();

        services.unshift('home');

        return (
            <div>
                <AppNavPanel
                    eventId={params.id}
                    services={services}
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                />
                <div style={{ padding: '10px' }} >
                    <SwipeableViews
                        index={this.state.slideIndex}
                        onChangeIndex={(v) => this.handleChange_(v, services, params.id)}
                    >
                        {services.map((service, index) => (
                            <div key={index} style={{ display: 'flex', justifyContent: 'center', minHeight: '700px' }}>
                                {(index === this.state.slideIndex) ? children : (<Spinner />)}
                            </div>
                        ))}
                    </SwipeableViews>
                </div>
            </div >
        );
    }
}

AppEvent.propTypes = {
    children   : PropTypes.element,
    params     : PropTypes.object,
    eventsByIds: PropTypes.instanceOf(Map)
};

export default AppEvent;
