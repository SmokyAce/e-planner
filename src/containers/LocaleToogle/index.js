// components
import { connect } from 'react-redux';
import LocaleToggle from '../../components/LocaleToogle_';
// selectors
import { createSelector } from 'reselect';
import { selectLocale } from '../LanguageProvider/selectors';
// actios
import { bindActionCreators } from 'redux';
import { changeLocale } from '../LanguageProvider/module';


const mapStateToProps = createSelector(
    selectLocale(),
    (locale) => ({ locale })
);

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onLocaleToggle: changeLocale
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LocaleToggle);
