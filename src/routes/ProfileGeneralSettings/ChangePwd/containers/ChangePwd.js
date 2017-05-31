// components
import { connect } from 'react-redux';
import ChangePassword from '../components/ChangePassword';
// actions
import { bindActionCreators } from 'redux';
import { changeUserPwdRequest } from '../../../AppAuth/modules/actions';
// selectors
import { createStructuredSelector } from 'reselect';
import { makeSelectChangedPwdSucceeded } from '../../../AppAuth/modules/selectors';


const mapStateToProps = () => createStructuredSelector({
    changedPwdSucceeded: makeSelectChangedPwdSucceeded()
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onSubmit: changeUserPwdRequest
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
