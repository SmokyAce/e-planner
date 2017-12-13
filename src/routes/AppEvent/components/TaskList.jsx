import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
// components
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
// icons
import DoneIcon from 'material-ui/svg-icons/action/done';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

class TaskList extends Component {
    render() {
        const { taskIds, taskEntries, actions, eventId } = this.props;

        __DEV__ && console.log('TaskList render!');
        if (!taskIds) {
            return null;
        }

        const [...taskList] = taskIds.keys();

        const onClickRemoveTask = id => {
            return function A() {
                return actions.removeTask(id, eventId);
            };
        };
        const onClickToggleTask = (id, complete) => {
            return function A() {
                return actions.toggleTask(id, complete);
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
                        const completed = task.get('completed');

                        return (
                            <ListItem
                                key={i}
                                leftAvatar={
                                    <Avatar backgroundColor={completed ? 'mediumseagreen' : 'grey'}>
                                        <IconButton onClick={onClickToggleTask(id, completed)}>
                                            <DoneIcon color='white' />
                                        </IconButton>
                                    </Avatar>
                                }
                                rightIcon={
                                    <IconButton style={{ padding: '0px' }} onClick={onClickRemoveTask(id)}>
                                        <DeleteIcon color={'grey'} />
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
    actions    : PropTypes.object.isRequired,
    eventId    : PropTypes.string.isRequired
};

export default TaskList;
