import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectTaskEntries } from '../modules/selectors';
import TaskList from '../components/TaskList';

const mapStateToProps = (state, ownProps) =>
    createStructuredSelector({
        taskEntries: makeSelectTaskEntries()
    });

export default connect(mapStateToProps, null)(TaskList);
