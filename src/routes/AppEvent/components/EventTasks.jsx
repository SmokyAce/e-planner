import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
// components
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TaskList from '../containers/TaskListContainer';
import NewTask from './NewTask';
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
        const { pageIndex, params } = this.props;

        // console.log(params);

        const addTaskBtn = {
            right   : `-${pageIndex * 100 - 5}%`,
            position: 'fixed',
            bottom  : '5%'
        };

        console.log('EventTasks render!');
        return (
            <div className='flexbox-column'>
                <NewTask showComponent={this.state.showNewTask} />
                <TaskList taskIds={List([])} params={params} />
                <FloatingActionButton onClick={this.handleOpen} style={addTaskBtn}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
}

EventTasks.propTypes = {
    pageIndex: PropTypes.number,
    params   : PropTypes.object
};

export default EventTasks;
