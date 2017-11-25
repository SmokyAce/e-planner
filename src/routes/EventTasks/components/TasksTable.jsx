import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

const tableData = [
    {
        name  : 'John Smith',
        status: 'Employed'
    },
    {
        name  : 'Randal White',
        status: 'Unemployed'
    },
    {
        name  : 'Stephanie Sanders',
        status: 'Employed'
    },
    {
        name  : 'Steve Brown',
        status: 'Employed'
    },
    {
        name  : 'Joyce Whitten',
        status: 'Employed'
    },
    {
        name  : 'Samuel Roberts',
        status: 'Employed'
    },
    {
        name  : 'Adam Moore',
        status: 'Employed'
    }
];

class TasksTable extends Component {
    state = {
        fixedHeader        : true,
        fixedFooter        : true,
        stripedRows        : false,
        showRowHover       : true,
        selectable         : true,
        multiSelectable    : true,
        enableSelectAll    : true,
        deselectOnClickaway: true,
        showCheckboxes     : true
    };

    shouldComponentUpdate = (nextProps, nextState) => true;

    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled
        });
    };

    handleChange = event => {
        this.setState({ height: event.target.value });
    };

    render() {
        return (
            <div>
                <Table
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                    >
                        <TableRow>
                            <TableHeaderColumn tooltip='№' style={{ width: '20px' }}>
                                №
                            </TableHeaderColumn>
                            <TableHeaderColumn tooltip='Description'>Description</TableHeaderColumn>
                            <TableHeaderColumn tooltip='The Status'>Status</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        {tableData.map((row, index) => (
                            <TableRow key={index}>
                                <TableRowColumn style={{ width: '20px' }}>{index + 1}</TableRowColumn>
                                <TableRowColumn>{row.name}</TableRowColumn>
                                <TableRowColumn>{row.status}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

TasksTable.propTypes = {};

export default TasksTable;
