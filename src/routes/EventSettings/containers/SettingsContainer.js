import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Settings from '../components/Settings';
import { makeSelectEventsSettingsFormState } from '../../App/modules/selectors';

const mapStateToProps = (state, ownProps) => {
    return createStructuredSelector({
        formState: makeSelectEventsSettingsFormState()
    });
};

export default connect(mapStateToProps, null)(Settings);
