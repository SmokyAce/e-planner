import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

function mapStateToProps(state) {
    return {
        locale   : state.getIn(['locale', 'lang']),
        key      : state.getIn(['locale', 'lang']),
        messages : state.getIn(['locale', 'messages']),
        languages: state.getIn(['locale', 'languages'])
    };
}
export default connect(mapStateToProps)(IntlProvider);
