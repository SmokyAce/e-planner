import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectEventsByIds } from '../../App/modules/selectors';
import Event from '../components/Event';


const mapStateToProps = (state) => createStructuredSelector({
    eventsByIds: makeSelectEventsByIds()
});

export default connect(mapStateToProps, null)(Event);
