import React from 'react';
import PropTypes from 'prop-types';
// components
import AuthForm from '../../../components/AuthForm';
import Col from '../../../components/Grid/Col';
import './AuthPage.scss';

const AuthPage = props => {
    return (
        <div className='popup-container'>
            <Col md={4} />
            <Col md={4} style={{ top: '25%' }}>
                <AuthForm
                    loginRequest={props.loginRequest}
                    registerRequest={props.registerRequest}
                    loginWithProviderRequest={props.loginWithProviderRequest}
                />
            </Col>
            <Col md={4} />
        </div>
    );
};

AuthPage.propTypes = {
    loginRequest            : PropTypes.func,
    registerRequest         : PropTypes.func,
    loginWithProviderRequest: PropTypes.func
};


export default AuthPage;
