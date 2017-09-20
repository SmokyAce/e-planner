import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';


export const HomeView = () => {
    return (
        <div>
            <h2><FormattedMessage {...messages.greeting} /></h2>
        </div>
    );
};

HomeView.propTypes = {};

export default HomeView;
