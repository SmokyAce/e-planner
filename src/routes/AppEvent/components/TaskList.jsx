import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
// components
import { List, ListItem } from 'material-ui/List';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import DoneIcon from 'material-ui/svg-icons/action/done';

class TaskList extends Component {
    render() {
        const { taskIds, taskEntries } = this.props;

        console.log('TaskList render!');
        if (!taskIds) {
            return <div>Create tasks to not miss a details</div>;
        }

        const [...taskList] = taskIds.keys();

        return (
            <div>
                <Paper zDepth={1} style={{ margin: '5px' }}>
                    <List>
                        <Subheader inset>Event task list</Subheader>
                        {taskList.map((item, i) => {
                            const task = taskEntries.get(item);

                            if (!task) {
                                return <div key={i}>I don't find task by id: {item}</div>;
                            }

                            return (
                                <ListItem
                                    key={i}
                                    leftAvatar={<Avatar icon={<DoneIcon />} />}
                                    rightIcon={<DeleteIcon />}
                                    primaryText={task.get('description')}
                                    secondaryText={task.get('date')}
                                />
                            );
                        })}
                    </List>
                    <Divider inset />
                </Paper>
            </div>
        );
    }
}

TaskList.propTypes = {
    taskIds    : PropTypes.instanceOf(Map),
    taskEntries: PropTypes.instanceOf(Map)
};

export default TaskList;
