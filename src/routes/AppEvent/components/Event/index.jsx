import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { browserHistory } from 'react-router';
import { isEqual } from 'lodash';
// components
import SwipeableViews from 'react-swipeable-views';
import AppNavPanel from '../AppNavPanel';
// import Spinner from '../../../../components/Spinner';
import asyncService from '../../asyncService';
import './Event.scss';

class AppEvent extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.getComponentState(props);

        this.handleChangeSwipeView = this.handleChangeSwipeView.bind(this);
        this.tabsScrollLeft = this.tabsScrollLeft.bind(this);
    }

    componentDidMount = () => this.tabsScrollLeft(this.state.slideIndex);

    componentWillReceiveProps = nextProps => this.setState(this.getComponentState(nextProps));

    shouldComponentUpdate = (nextProps, nextState) =>
        !isEqual(nextProps.location, this.props.location) || !isEqual(nextProps.eventEntry, this.props.eventEntry);

    handleChange = value => {
        this.setState({ slideIndex: value });
        this.tabsScrollLeft(value);
    };

    handleChangeSwipeView = (index, evId) => {
        // change route
        browserHistory.push(`/app/event/${evId}#${this.state.services[index]}`);

        this.setState({ slideIndex: index });
        this.tabsScrollLeft(index);
    };

    getComponentState = props => {
        let services = [];

        const { eventEntry, location } = props;

        if (eventEntry) {
            [...services] = eventEntry
                .get('services')
                .filter(isChecked => isChecked)
                .keys();

            services.push('settings');
            services.unshift('home');
        }

        const slideIndex = services.indexOf(location.hash.slice(1));

        return {
            slideIndex: slideIndex === -1 ? 0 : slideIndex,
            services
        };
    };

    tabsScrollLeft = value => {
        const tabsEl = document.getElementById('event-tabs');

        if (tabsEl) {
            tabsEl.childNodes[0].scrollLeft = value === 1 ? 0 : value * 20;
        }
    };

    render() {
        console.log('AppEvent render!');
        const { params, dispatch, eventEntry } = this.props;
        const { services, slideIndex } = this.state;

        if (!eventEntry) {
            return <div>Loading ...</div>;
        }

        return (
            <div className='flexbox-column'>
                <AppNavPanel eventId={params.id} services={services} onChange={this.handleChange} value={slideIndex} />
                <SwipeableViews
                    index={slideIndex}
                    onChangeIndex={index => this.handleChangeSwipeView(index, params.id)}
                    style={{ display: 'flex', flex: '1' }}
                >
                    {services.map((name, index) => (
                        <div className='flexbox-row' style={{ justifyContent: 'center' }} key={index}>
                            {asyncService(name, { eventEntry, pageIndex: index, dispatch })}
                        </div>
                    ))}
                </SwipeableViews>
            </div>
        );
    }
}

AppEvent.contextTypes = {
    store: PropTypes.object
};

AppEvent.propTypes = {
    params    : PropTypes.object,
    eventEntry: PropTypes.instanceOf(Map),
    location  : PropTypes.object,
    dispatch: PropTypes.func
};

export default AppEvent;
