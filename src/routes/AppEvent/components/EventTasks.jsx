import React, { Component } from 'react';
import PropTypes from 'prop-types';
// components
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TasksTable from './TasksTable';
import { isEqual } from 'lodash';

class EventTasks extends Component {
    state = {
        showNewTask: false
    };

    shouldComponentUpdate = (nextProps, nextState) =>
        !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);

    handleOpen = () => {
        this.setState({ showNewTask: !this.state.showNewTask });
    };

    render() {
        const { pageIndex } = this.props;

        const addTaskBtn = {
            right   : `-${pageIndex * 100 - 5}%`,
            position: 'fixed',
            bottom  : '5%'
        };

        console.log('EventTasks render!');
        return (
            <div className='flexbox-column'>
                <TasksTable style={{ flex: '1' }} showNewTask={this.state.showNewTask} />
                <FloatingActionButton onClick={this.handleOpen} style={addTaskBtn}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
}

EventTasks.propTypes = {
    pageIndex: PropTypes.number
    // tasksById: PropTypes.object
};

export default EventTasks;
