import React  from 'react';
// import PropTypes from 'prop-types';
import AuthContainer from './AuthContainer';
import { registerRequest } from '../modules/actions';

const RegisterHOC = (Component) => {
    class HOC extends React.Component {
        extProps = {
            type    : 'register',
            onSubmit: registerRequest
        };

        render() {
            return <Component {...this.extProps} />;
        }
    }
    return HOC;
};

export default RegisterHOC(AuthContainer);
