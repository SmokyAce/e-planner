import React from 'react';
import PropTypes from 'prop-types';
// components
import { FormattedDate, FormattedMessage } from 'react-intl';
import AuthForm from '../../../components/AuthForm';
import Col from '../../../components/Grid/Col';
// intl
import messages from './messages';
// styles
import './HomeView.scss';


const HomeView = ({ loginRequest, registerRequest, loginWithProviderRequest }) => {
    return (
        <div className='container'>
            <Col md={8}>
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
                </div>
            </Col>
            <Col md={4}>
                <AuthForm
                    loginRequest={loginRequest}
                    registerRequest={registerRequest}
                    loginWithProviderRequest={loginWithProviderRequest}
                />
            </Col>
        </div>
    );
};

HomeView.propTypes = {
    loginRequest            : PropTypes.func,
    registerRequest         : PropTypes.func,
    loginWithProviderRequest: PropTypes.func
};

export default HomeView;
