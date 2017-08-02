import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
// import SwipeableViews from 'react-swipeable-views';
import AppNavPanel from '../AppNavPanel';


class AppEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex   : 0,
            selectedIndex: 0
        };
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value
        });
    };

    select = (index) => this.setState({ selectedIndex: index });

    render() {
        const { children, params, eventsByIds } = this.props;

        if (eventsByIds.size === 0) {
            return <div>Loading ...</div>;
        }

        const services = eventsByIds.getIn([params.id, 'services']).filter(isChecked => isChecked);

        return (
            <div>
                <AppNavPanel
                    eventId={params.id}
                    services={services}
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                    selectedIndex={this.state.selectedIndex}
                    select={this.select}
                />
                <div style={{ padding: '10px' }} >
                    {children}
                </div>
            </div>
        );
    }
}

AppEvent.propTypes = {
    children   : PropTypes.element,
    params     : PropTypes.object,
    eventsByIds: PropTypes.instanceOf(Map)
};

export default AppEvent;
