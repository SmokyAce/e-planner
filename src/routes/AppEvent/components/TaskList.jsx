import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { iList, Map } from 'immutable';
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

        return (
            <div>
                <Paper zDepth={1} style={{ margin: '5px' }}>
                    <List>
                        <Subheader inset>Event task list</Subheader>
                        {taskIds.map((item, index) => {
                            const task = taskEntries.get(item);

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
    taskIds    : PropTypes.instanceOf(iList),
    taskEntries: PropTypes.instanceOf(Map)
};

export default TaskList;
