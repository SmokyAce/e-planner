import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';


export const EventDelete = () => {
    return (
        <div>
            <h2><FormattedMessage {...messages.description} /></h2>
        </div>
    );
};

EventDelete.propTypes = {};

export default EventDelete;
