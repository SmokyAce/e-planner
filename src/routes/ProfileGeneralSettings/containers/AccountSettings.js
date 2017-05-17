// components
import { connect } from 'react-redux';
import AccountSettings from '../components/AccountSettings';
// selectors
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from '../../App/modules/selectors';
import { makeSelectMessage, makeSelectFormState } from '../../AppAuth/modules/selectors';
import { selectLocale } from '../../../containers/LanguageProvider/selectors';
// actios
import { bindActionCreators } from 'redux';
import { changeLocale } from '../../../containers/LanguageProvider/module';


const mapStateToProps = state => createStructuredSelector({
    currentUser: makeSelectCurrentUser(),
    formState  : makeSelectFormState(),
    message    : makeSelectMessage(),
    locale     : selectLocale()
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onLocaleToggle: changeLocale
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);

