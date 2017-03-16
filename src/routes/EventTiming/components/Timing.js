import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';


export const Timing = () => {
    return (
        <div>
            <h2><FormattedMessage {...messages.description} /></h2>
        </div>
    );
};

Timing.propTypes = {};

export default Timing;
