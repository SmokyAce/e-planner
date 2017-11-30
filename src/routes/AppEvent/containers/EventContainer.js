import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectEventById } from '../../App/modules/selectors';
import Event from '../components/Event';

const mapStateToProps = (state, ownProps) =>
    createStructuredSelector({
        eventEntry: makeSelectEventById(ownProps.params.id)
    });

export default connect(mapStateToProps, null)(Event);
