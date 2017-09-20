import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';


export const EventBudjet = () => {
    return (
        <div>
            <h2><FormattedMessage {...messages.description} /></h2>
        </div>
    );
};

EventBudjet.propTypes = {};

export default EventBudjet;
