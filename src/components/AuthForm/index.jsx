import React from 'react';
import PropTypes from 'prop-types';
// components
import { FormattedMessage } from 'react-intl';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import H2 from '../H2';
// intl
import messages from './messages';
// styles
import './AuthForm.scss';


class AuthForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { register: false };

        this.changeFormType = this.changeFormType.bind(this);
    }

    changeFormType() {
        this.setState(prevState => ({
            register: !prevState.register
        }));
    }

    render() {
        const form = this.state.register ? 'register' : 'login';
        const { loginRequest, registerRequest, loginWithProviderRequest } = this.props;

        return (
            <Paper zDepth={1} className='auth-form' style={{ backgroundColor: '#f6f9fc' }} >
                <div className='auth-header'>
                    <H2>
                        <FormattedMessage {...messages[`${form}_description`]} />
                    </H2>
                    <div>
                        <span><FormattedMessage {...messages.or} /></span>
                        <span />{' '}
                        <a
                            onClick={this.changeFormType}
                            style={{ cursor: 'pointer', color: '#21a3f6' }}
                        >
                            <FormattedMessage {...messages[`${form === 'login' ? 'register' : 'login'}_action`]} />
                        </a>
                    </div>
                </div>
                {this.state.register ? <SignUp onSubmit={registerRequest} /> : <SignIn onSubmit={loginRequest} />}
                <div className='auth-footer'>
                    <div className='hr-label'>
                        <span><FormattedMessage {...messages.or} /></span>
                    </div>
                    <div>
                        <RaisedButton
                            className='goggle-social-btn'
                            label={<FormattedMessage {...messages.login_with_goggle} />}
                            icon={<i className='fa fa-google fa-lg fa-inverse' />}
                            style={{ marginBottom: '20px' }}
                            labelStyle={{ borderLeft: '1px solid #e2e2e2' }}
                            fullWidth
                            primary
                            onClick={() => loginWithProviderRequest(form, 'google')}
                        />
                    </div>
                </div>
            </Paper>
        );
    }
}

AuthForm.propTypes = {
    loginRequest            : PropTypes.func,
    registerRequest         : PropTypes.func,
    loginWithProviderRequest: PropTypes.func
};

export default AuthForm;
