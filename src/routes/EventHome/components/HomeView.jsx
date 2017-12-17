import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
// components
import { FormattedMessage } from 'react-intl';
import H2 from '../../../components/H2';
import messages from './messages';

export const HomeView = props => {
    return (
        <div>
            <H2>
                {props.eventEntry.get('name')} <FormattedMessage {...messages.description} />
            </H2>
        </div>
    );
};

HomeView.propTypes = {
    eventEntry: PropTypes.instanceOf(Map)
};

export default HomeView;
