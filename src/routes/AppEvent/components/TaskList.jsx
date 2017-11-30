import React, { Component } from 'react';
import PropTypes from 'prop-types';
// components
import { List, ListItem } from 'material-ui/List';
import NewTask from './NewTask';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';

class TaskList extends Component {
    render() {
        const { showNewTask } = this.props;

        return (
            <div>
                <div style={{ margin: '5px' }}>
                    <NewTask showComponent={showNewTask} />
                </div>
                <Paper zDepth={1} style={{ margin: '5px' }}>
                    <List>
                        <Subheader inset>All task</Subheader>
                        <ListItem
                            leftAvatar={<Avatar icon={<FileFolder />} />}
                            rightIcon={<ActionInfo />}
                            primaryText='Photos'
                            secondaryText='Jan 9, 2014'
                        />
                        <ListItem
                            leftAvatar={<Avatar icon={<FileFolder />} />}
                            rightIcon={<ActionInfo />}
                            primaryText='Recipes'
                            secondaryText='Jan 17, 2014'
                        />
                        <ListItem
                            leftAvatar={<Avatar icon={<FileFolder />} />}
                            rightIcon={<ActionInfo />}
                            primaryText='Work'
                            secondaryText='Jan 28, 2014'
                        />
                    </List>
                    <Divider inset />
                </Paper>
            </div>
        );
    }
}

TaskList.propTypes = {
    showNewTask: PropTypes.bool
};

export default TaskList;
