// components
import { connect } from 'react-redux';
import Settings from '../components/Settings';
// selectors
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from '../../App/modules/selectors';
import { selectLocale } from '../../../containers/LanguageProvider/selectors';

const mapStateToProps = state =>
    createStructuredSelector({
        locale: selectLocale(),
        user  : makeSelectCurrentUser()
    });

export default connect(mapStateToProps, null)(Settings);
