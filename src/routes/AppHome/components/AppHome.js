import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
// components
import { FormattedMessage } from 'react-intl';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Spinner from '../../../components/Spinner';
import EventsList from './EventsList';
import CreateEvent from './CreateEvent';
import DeleteEvent from './DeleteEvent';
// intl
import messages from './messages';
// styles
import './AppHome.scss';


const styles = {
    spinner: {
        width    : '60px',
        height   : '60px',
        position : 'absolute',
        top      : '50%',
        left     : '50%',
        transform: 'translate(-50%, -50%)'
    },
    customContentStyle: {
        maxWidth: '400px',
        minWidth: '300px'
    }
};

const Title = props => (
    <div {...props}>
        <FormattedMessage {...messages.create_event_desc} />
    </div>
);

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
        const { restored, eventsByIds, locale, addEvent, removeEvent, toggleEventService, formValues } = this.props;

        const actions = [
            <FlatButton
                label='Cancel'
                primary
                keyboardFocused
                onTouchTap={() => this.handleClose('CreateEvent')}
                key={1}
            />,
            <FlatButton
                label='Ok'
                primary
                onTouchTap={() => {
                    addEvent(formValues);
                    this.handleClose('CreateEvent');
                }}
                keyboardFocused
                key={2}
            />
        ];

        if (!restored) {
            return (
                <div style={{ position: 'relative', height: '200px' }}>
                    <Spinner style={styles.spinner} />
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
                <Dialog
                    title={<Title />}
                    titleStyle={{ margin: '10px' }}
                    actions={actions}
                    modal={false}
                    open={this.state.openCreateEvent}
                    onRequestClose={() => this.handleClose('CreateEvent')}
                    contentStyle={styles.customContentStyle}
                    autoDetectWindowHeight
                >
                    <CreateEvent
                        locale={locale}
                        onSubmit={() => {
                            addEvent();
                            this.handleClose('CreateEvent');
                        }}
                        toggleEventService={toggleEventService}
                    />
                </Dialog>
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
    restored          : PropTypes.bool.isRequired,
    eventsByIds       : PropTypes.instanceOf(Map),
    locale            : PropTypes.string.isRequired,
    removeEvent       : PropTypes.func.isRequired,
    addEvent          : PropTypes.func.isRequired,
    toggleEventService: PropTypes.func.isRequired,
    formValues        : PropTypes.object
};

export default AppHome;
