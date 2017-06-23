import React from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import messages from './messages';
import './HomeView.scss';


export const HomeView = () => {
    return (
        <div>
            <h4>
                <FormattedMessage {...messages.greeting} />
            </h4>
            <FormattedDate value={Date.now()} />
            <img
                alt='This is a duck, because Redux!'
                className='duck'
                src='/img/Duck.jpg'
            />
            <div style={{ height: '1000px' }} />
        </div>
    );
};

export default HomeView;
