import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { isEqual } from 'lodash';
// components
import { FormattedMessage } from 'react-intl';
import H2 from '../../../../components/H2';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TaskList from '../TaskList';
import AddTask from '../AddTask';
import messages from './messages';

class EventTasks extends Component {
    state = {
        showAddTask: false
    };

    shouldComponentUpdate = (nextProps, nextState) =>
        !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);

    handleOpen = () => {
        this.setState({ showAddTask: !this.state.showAddTask });
    };

    render() {
        const { pageIndex, eventEntry, locale, actions, taskEntries } = this.props;
        const addTaskBtn = {
            right   : `-${pageIndex * 100 - 5}%`,
            position: 'fixed',
            bottom  : '5%'
        };
        const eventId = eventEntry.get('id');

        console.log('EventTasks render!');
        return (
            <div className='flexbox-column'>
                <H2 className='text-center'>
                    <FormattedMessage {...messages.description} />
                </H2>
                {this.state.showAddTask && (
                    <AddTask
                        onSubmit={values => {
                            actions.addTask(values, eventId);
                            this.handleOpen();
                        }}
                        locale={locale}
                    />
                )}
                <TaskList
                    taskIds={eventEntry.get('tasks')}
                    taskEntries={taskEntries}
                    actions={actions}
                    eventId={eventId}
                />
                <FloatingActionButton onClick={this.handleOpen} style={addTaskBtn}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
}

EventTasks.propTypes = {
    pageIndex  : PropTypes.number,
    eventEntry : PropTypes.instanceOf(Map),
    taskEntries: PropTypes.instanceOf(Map),
    locale     : PropTypes.string,
    actions    : PropTypes.object
};

export default EventTasks;
