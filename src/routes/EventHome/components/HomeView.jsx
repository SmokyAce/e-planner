import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export const HomeView = props => {
    return (
        <div>
            <h2>
                {props.eventEntry.get('name')} <FormattedMessage {...messages.description} />
            </h2>
        </div>
    );
};

HomeView.propTypes = {
    eventEntry: PropTypes.instanceOf(Map)
};

export default HomeView;
