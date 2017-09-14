import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// components
import { FormattedMessage } from 'react-intl';
import AuthForm from '../../../components/AuthForm';
import H1 from '../../../components/H1';
import H2 from '../../../components/H2';
import Col from '../../../components/Grid/Col';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
// intl
import messages from './messages';
// styles
import './HomeView.scss';


class HomeView extends React.Component {
    render() {
        const { loginRequest, registerRequest, loginWithProviderRequest } = this.props;

        return (
            <div className='content'>
                <Header />
                <div className='container'>
                    <div style={{ paddingTop: '40px', paddingBottom: '40px' }}>
                        <Col md={8}>
                            <div className='app-description'>
                                <H1 style={{ fontSize: '30pt' }}>
                                    <FormattedMessage {...messages.greeting} />
                                </H1>
                                <ReactCSSTransitionGroup
                                    transitionName='slide'
                                    component='ul'
                                    transitionEnter={false}
                                    transitionLeave={false}
                                    transitionAppear
                                    transitionAppearTimeout={500}
                                    className='feautures'
                                >
                                    {Object.keys(messages.features).map((item, index) => {
                                        console.log(item);
                                        console.log(index);
                                        return (
                                            <li key={index} style={{ transitionDelay: `${500 * index}ms` }}>
                                                <H2><FormattedMessage {...messages.features[item]} /></H2>
                                            </li>
                                        );
                                    })}
                                </ReactCSSTransitionGroup>
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
    }
}

HomeView.propTypes = {
    loginRequest            : PropTypes.func,
    registerRequest         : PropTypes.func,
    loginWithProviderRequest: PropTypes.func
};

export default HomeView;
