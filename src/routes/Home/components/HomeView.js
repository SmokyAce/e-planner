import React from 'react';
// components
import { FormattedDate, FormattedMessage } from 'react-intl';
import AuthComponent from './AuthComponent';
import Col from '../../../components/Grid/Col';
// intl
import messages from './messages';
// styles
import './HomeView.scss';


export const HomeView = () => {
    return (
        <div className='container'>
            <Col md={8}>
                <h4>
                    <FormattedMessage {...messages.greeting} />
                </h4>
                <FormattedDate value={Date.now()} />
                <img
                    alt='This is a duck, because Redux!'
                    className='duck'
                    src='/img/Duck.jpg'
                />
            </Col>
            <Col md={4}>
                <AuthComponent />
            </Col>
        </div>
    );
};

export default HomeView;
