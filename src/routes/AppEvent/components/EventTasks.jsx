import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// components
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TasksTable from './TasksTable';
import AddTask from './AddTask';
<<<<<<< HEAD:src/routes/AppEvent/components/EventTasks.jsx
import { isEqual } from 'lodash';
=======
import './EventTasks.scss';
>>>>>>> master:src/routes/EventTasks/components/EventTasks.jsx

class EventTasks extends Component {
    state = {
        showAddTask: false
    };

    shouldComponentUpdate = (nextProps, nextState) => !isEqual(nextProps, this.props);

    handleOpen = () => {
        this.setState({ showAddTask: !this.state.showAddTask });
    };

    render() {
        console.log('EventTasks render!');
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
