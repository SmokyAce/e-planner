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
        openAddEvent: false
    };

    handleOpen = () => {
        this.setState({ openAddEvent: true });
    };

    handleClose = () => {
        this.setState({ openAddEvent: false });
    };

    render() {
        const { restored, eventsByIds, locale } = this.props;

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
                    <EventsList eventsByIds={eventsByIds} />
                </div>
                <FloatingActionButton
                    className='add-event-btn'
                    onTouchTap={this.handleOpen}
                >
                    <ContentAdd />
                </FloatingActionButton>
                <CreateEvent
                    openModal={this.state.openAddEvent}
                    handleClose={this.handleClose}
                    locale={locale}
                />
            </div>
        );
    }
}

AppHome.propTypes = {
    restored   : PropTypes.bool.isRequired,
    eventsByIds: PropTypes.instanceOf(Map),
    locale     : PropTypes.string.isRequired
};

export default AppHome;
