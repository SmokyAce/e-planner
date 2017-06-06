// components
import { connect } from 'react-redux';
import AccountSettings from '../components/AccountSettings';
// selectors
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser, makeSelectCurrentUserField } from '../../../App/modules/selectors';
// import { makeSelectMessage, makeSelectFormState } from '../../../AppAuth/modules/selectors';
import { selectLocale } from '../../../../containers/LanguageProvider/selectors';
// actios
import { bindActionCreators } from 'redux';
import { changeLocale as onLocaleToggle } from '../../../../containers/LanguageProvider/module';
import { saveUserInfoRequest } from '../../../App/modules/users/actions';


const mapStateToProps = state => createStructuredSelector({
    currentUser  : makeSelectCurrentUser(),
    initialValues: createStructuredSelector({
        displayName: makeSelectCurrentUserField('displayName'),
        language   : makeSelectCurrentUserField('language') || selectLocale(),
        sex        : makeSelectCurrentUserField('sex')
    })
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onLocaleToggle,
    onSubmit: saveUserInfoRequest
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);

