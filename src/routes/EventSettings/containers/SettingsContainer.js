import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Settings from '../components/Settings';
import { makeSelectEventsOptionsById, makeSelectEventsSettingsFormState } from '../../App/modules/selectors';

const mapStateToProps = (state, ownProps) => {
    return createStructuredSelector({
        eventOptions: makeSelectEventsOptionsById(ownProps.params.id),
        formState   : makeSelectEventsSettingsFormState()
    });
};

export default connect(mapStateToProps, null)(Settings);
