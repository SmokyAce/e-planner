// components
import { connect } from 'react-redux';
import AccountSettings from '../components/AccountSettings';
// selectors
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser, makeSelectCurrentUserField } from '../../../App/modules/selectors';
import { selectLocale } from '../../../../containers/LanguageProvider/selectors';
// actios
import { bindActionCreators } from 'redux';
import { changeLocale as onLocaleToggle } from '../../../../containers/LanguageProvider/module';
import { saveUserData } from '../../../App/modules/user';


const mapStateToProps = state => createStructuredSelector({
    currentUser  : makeSelectCurrentUser(),
    locale       : selectLocale(),
    initialValues: createStructuredSelector({
        displayName: makeSelectCurrentUserField('displayName'),
        language   : makeSelectCurrentUserField('language'),
        sex        : makeSelectCurrentUserField('sex')
    })
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onLocaleToggle,
    onSubmit: saveUserData
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);

