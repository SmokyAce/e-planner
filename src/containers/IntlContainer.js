import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

function mapStateToProps(state) {
    const { lang, messages, languages } = state.locale;
    return { locale: lang, key: lang, messages, languages };
}
export default connect(mapStateToProps)(IntlProvider);