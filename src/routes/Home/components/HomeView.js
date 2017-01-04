import React from 'react';
import { FormattedDate } from 'react-intl';
import './HomeView.scss';

export const HomeView = () => (
    <div>
        <h4>Welcome!</h4>
        <FormattedDate value={Date.now()} />
        <img
            alt='This is a duck, because Redux!'
            className='duck'
            src='/img/Duck.jpg'
        />
    </div>
);

export default HomeView;
