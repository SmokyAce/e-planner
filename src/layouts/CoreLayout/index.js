// components
import { connect } from 'react-redux';
import CoreLayout from './CoreLayout';
// selectors
import { createSelector } from 'reselect';
import { makeSelectLoggedIn } from '../../routes/AppAuth/modules/selectors';


const mapStateToProps = createSelector(
    makeSelectLoggedIn(),
    (loggedIn) => ({ loggedIn })
);

export default connect(mapStateToProps)(CoreLayout);
