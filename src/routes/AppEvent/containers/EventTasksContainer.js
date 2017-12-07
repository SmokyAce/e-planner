import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectLocale } from '../../../containers/LanguageProvider/selectors';
import { makeSelectTaskEntries } from '../modules/selectors';
import * as taskActions from '../modules/tasks';
import Tasks from '../components/Tasks';

const mapStateToProps = state =>
    createStructuredSelector({
        locale     : selectLocale(),
        taskEntries: makeSelectTaskEntries()
    });

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(taskActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
