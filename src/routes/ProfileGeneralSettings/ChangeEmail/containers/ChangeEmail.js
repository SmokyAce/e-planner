// components
import { connect } from 'react-redux';
import ChangeEmail from '../components/ChangeEmail';
// selectors
import { createStructuredSelector } from 'reselect';
import { makeSelectChangedEmailSucceeded } from '../../../AppAuth/modules/selectors';
import { makeSelectCurrentUserEmail } from '../../../App/modules/selectors';
// actions
import { bindActionCreators } from 'redux';
import { changeAccountEmailRequest } from '../../../AppAuth/modules/actions';


const mapStateToProps = state => createStructuredSelector({
    currentEmail         : makeSelectCurrentUserEmail(),
    changedEmailSucceeded: makeSelectChangedEmailSucceeded()
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onSubmit: changeAccountEmailRequest
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChangeEmail);
