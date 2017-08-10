import React from 'react';
import PropTypes from 'prop-types';
// components
import { FormattedDate, FormattedMessage } from 'react-intl';
import AuthForm from '../../../components/AuthForm';
import Col from '../../../components/Grid/Col';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
// intl
import messages from './messages';
// styles
import './HomeView.scss';


const HomeView = ({ loginRequest, registerRequest, loginWithProviderRequest }) => {
    return (
        <div className='content'>
            <Header />
            <div className='container'>
                <div style={{ paddingTop: '40px', paddingBottom: '40px' }}>
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
            </div>
            <Footer />
        </div>
    );
};

HomeView.propTypes = {
    loginRequest            : PropTypes.func,
    registerRequest         : PropTypes.func,
    loginWithProviderRequest: PropTypes.func
};

export default HomeView;
