import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// components
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TasksTable from './TasksTable';
import AddTask from './AddTask';
import './EventTasks.scss';

class EventTasks extends Component {
    state = {
        showAddTask: false
    };

    handleOpen = () => {
        this.setState({ showAddTask: !this.state.showAddTask });
    };

    render() {
        return (
            <div>
                <AddTask showComponent={this.state.showAddTask} />
                <TasksTable />
                <FloatingActionButton className='add-task-btn' onClick={this.handleOpen}>
                    <ContentAdd />
                </FloatingActionButton>
                <br />
            </div>
        );
    }
}

EventTasks.propTypes = {
    // tasksList: PropTypes.array,
    // tasksById: PropTypes.object
};

export default EventTasks;
