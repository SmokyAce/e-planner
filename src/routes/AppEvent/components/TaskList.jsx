import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
// components
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import DoneIcon from 'material-ui/svg-icons/action/done';

class TaskList extends Component {
    render() {
        const { taskIds, taskEntries, removeTask, eventId } = this.props;

        console.log('TaskList render!');
        if (!taskIds) {
            return null;
        }

        const [...taskList] = taskIds.keys();

        const onClick = id => {
            return function A() {
                return removeTask(id, eventId);
            };
        };

        return (
            <Paper zDepth={1} style={{ margin: '5px' }}>
                <List>
                    <Subheader inset>Event task list</Subheader>
                    {taskList.map((id, i) => {
                        const task = taskEntries.get(id);

                        if (!task) {
                            return <div key={i}>I don't find task by id: {id}</div>;
                        }
                        const description = task.get('description');
                        const date = !task.get('date') ? '' : new Date(task.get('date')).toDateString();

                        return (
                            <ListItem
                                key={i}
                                leftAvatar={<Avatar icon={<DoneIcon />} />}
                                rightIcon={
                                    <IconButton style={{ padding: '0px' }} onClick={onClick(id)}>
                                        <DeleteIcon color={'#757575'} />
                                    </IconButton>
                                }
                                primaryText={description}
                                secondaryText={date}
                            />
                        );
                    })}
                </List>
                <Divider inset />
            </Paper>
        );
    }
}

TaskList.propTypes = {
    taskIds    : PropTypes.instanceOf(Map),
    taskEntries: PropTypes.instanceOf(Map),
    removeTask : PropTypes.func.isRequired,
    eventId    : PropTypes.string.isRequired
};

export default TaskList;
