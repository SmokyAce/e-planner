import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';


export const EventBlog = () => {
    return (
        <div>
            <h2><FormattedMessage {...messages.description} /></h2>
        </div>
    );
};

EventBlog.propTypes = {};

export default EventBlog;
