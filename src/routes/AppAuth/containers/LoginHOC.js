import React  from 'react';
// import PropTypes from 'prop-types';
import AuthContainer from './AuthContainer';
import { loginRequest } from '../modules/actions';

const LoginHOC = (Component) => {
    class HOC extends React.Component {

        componentDidMount = () => {
            this.setState({
                type    : 'login',
                onSubmit: loginRequest
            });
        };


        render() {
            return <Component {...this.state} />;
        }
    }
    return HOC;
};

export default LoginHOC(AuthContainer);
