import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List as imList, Map } from 'immutable';
// components
import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
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

        return (
            <div>
                <Paper zDepth={1} style={{ margin: '5px' }}>
                    <List>
                        <Subheader inset>Event task list</Subheader>
                        {taskIds.map((item, index) => {
                            const task = taskEntries.get(item);

                            if (!task) {
                                return <div key={index}>I don't find task by id: {item}</div>;
                            }
                            return (
                                <ListItem
                                    key={index}
                                    leftAvatar={<Avatar icon={<DoneIcon />} />}
                                    rightIcon={<ActionInfo />}
                                    primaryText={task.description}
                                    secondaryText='Jan 9, 2014'
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
    taskIds    : PropTypes.instanceOf(imList),
    taskEntries: PropTypes.instanceOf(Map)
};

export default TaskList;
