import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './HomeView.scss';

export const HomeView = () => {
    return (
        <div>
            <h4>
                <FormattedMessage {...messages.greeting} />
            </h4>
        </div>
    );
};

export default HomeView;
