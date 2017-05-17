import React  from 'react';
// import PropTypes from 'prop-types';
import AuthContainer from './AuthContainer';
import { registerRequest } from '../modules/actions';

const RegisterHOC = (Component) => {
    class HOC extends React.Component {

        componentWillMount = () => {
            this.setState({
                type    : 'register',
                onSubmit: registerRequest
            });
        };


        render() {
            return <Component {...this.state} />;
        }
    }
    return HOC;
};

export default RegisterHOC(AuthContainer);
