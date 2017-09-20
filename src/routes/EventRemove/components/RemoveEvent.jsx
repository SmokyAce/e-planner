import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';


export const RemoveEvent = () => {
    return (
        <div>
            <h2><FormattedMessage {...messages.description} /></h2>
        </div>
    );
};

RemoveEvent.propTypes = {};

export default RemoveEvent;
