import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectLocale } from '../../../containers/LanguageProvider/selectors';
import { addTask } from '../modules/tasks';
import AddTask from '../components/AddTask';

const mapStateToProps = state =>
    createStructuredSelector({
        locale: selectLocale()
    });

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            onSubmit: addTask
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
