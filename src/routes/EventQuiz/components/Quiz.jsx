import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';


export const Quiz = () => {
    return (
        <div>
            <h2><FormattedMessage {...messages.description} /></h2>
        </div>
    );
};

Quiz.propTypes = {};

export default Quiz;
