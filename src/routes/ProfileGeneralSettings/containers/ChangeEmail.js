// components
import { connect } from 'react-redux';
import ChangeEmail from '../components/ChangeEmail';
// import withForm from '../../../containers/Form';
// selectors
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from '../../App/modules/selectors';
import { makeSelectMessage, makeSelectFormState } from '../../AppAuth/modules/selectors';


const mapStateToProps = state => createStructuredSelector({
    currentUser: makeSelectCurrentUser(),
    formState  : makeSelectFormState(),
    message    : makeSelectMessage()
});

export default connect(mapStateToProps, null)(ChangeEmail);
// export default withForm(ChangeEmail);
