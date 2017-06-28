import React  from 'react';
// import PropTypes from 'prop-types';
import AuthContainer from './AuthContainer';
import { loginRequest } from '../modules/actions';

const LoginHOC = (Component) => {
    class HOC extends React.Component {
        extProps = {
            type    : 'login',
            onSubmit: loginRequest
        };

        render() {
            return <Component {...this.extProps} />;
        }
    }
    return HOC;
};

export default LoginHOC(AuthContainer);
