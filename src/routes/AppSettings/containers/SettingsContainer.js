// components
import { connect } from 'react-redux';
import Settings from '../components/Settings';
// selectors
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from '../../App/modules/selectors';

const mapStateToProps = state =>
    createStructuredSelector({
        user: makeSelectCurrentUser()
    });

export default connect(mapStateToProps, null)(Settings);
