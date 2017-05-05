import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectEventsOptionsById } from '../../App/modules/selectors';

import RemoveEvent from '../components/RemoveEvent';


const mapStateToProps = (state, ownProps) => createStructuredSelector({
    eventOptions: makeSelectEventsOptionsById(ownProps.params.id)
});

export default connect(mapStateToProps, null)(RemoveEvent);
