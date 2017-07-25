import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
// components
import { FormattedMessage } from 'react-intl';
import Spinner from '../../../components/Spinner';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import EventsList from './EventsList';
import CreateEvent from './CreateEvent';
import DeleteEvent from './DeleteEvent';
// intl
import messages from './messages';
// styles
import './AppHome.scss';


const style = {
    spinner: {
        width    : '60px',
        height   : '60px',
        position : 'absolute',
        top      : '50%',
        left     : '50%',
        transform: 'translate(-50%, -50%)'
    }
};

class AppHome extends React.Component {
    state = {
        activeEvent    : 0,
        openCreateEvent: false,
        openDeleteEvent: false
    };

    handleOpen = (component) => {
        const obj = {};

        obj[`open${component}`] = true;

        this.setState(obj);
    };

    handleClose = (component) => {
        const obj = {};

        obj[`open${component}`] = false;

        this.setState(obj);
    };

    render() {
        const { restored, eventsByIds, locale, removeEvent } = this.props;

        if (!restored) {
            return (
                <div style={{ position: 'relative', height: '200px' }}>
                    <Spinner style={style.spinner} />
                </div>
            );
        }

        return (
            <div>
                <div className=''>
                    <h2><FormattedMessage {...messages.greeting} /></h2>
                    <EventsList
                        eventsByIds={eventsByIds}
                        onDeleteEvent={(id) => {
                            this.setState({ activeEvent: id });
                            this.handleOpen('DeleteEvent');
                        }}
                    />
                </div>
                <FloatingActionButton
                    className='add-event-btn'
                    onTouchTap={() => this.handleOpen('CreateEvent')}
                >
                    <ContentAdd />
                </FloatingActionButton>
                <CreateEvent
                    openModal={this.state.openCreateEvent}
                    handleClose={() => this.handleClose('CreateEvent')}
                    locale={locale}
                />
                <DeleteEvent
                    openModal={this.state.openDeleteEvent}
                    handleClose={() => this.handleClose('DeleteEvent')}
                    removeEvent={() => {
                        removeEvent(this.state.activeEvent);
                        this.handleClose('DeleteEvent');
                    }}
                />
            </div>
        );
    }
}

AppHome.propTypes = {
    restored   : PropTypes.bool.isRequired,
    eventsByIds: PropTypes.instanceOf(Map),
    locale     : PropTypes.string.isRequired,
    removeEvent: PropTypes.func.isRequired
};

export default AppHome;
