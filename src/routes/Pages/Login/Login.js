import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser, fetchUser, loginWithProvider } from '../../App/modules/user';

import { FormattedMessage } from 'react-intl';
import messages from '../messages';


class UserLogin extends Component {

    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.loginWithProvider = this.loginWithProvider.bind(this);
        this.state = {
            message: ''
        };
    }

    onFormSubmit(event) {
        event.preventDefault();

        const email = this.refs.email.value;
        const password = this.refs.password.value;

        this.props.loginUser({ email, password }).then((data) => {
            if (data.payload.errorCode) {
                this.setState({ message: data.payload.errorMessage });
            } else {
                browserHistory.push('/app/profile');
            }
        }
        );
    }

    loginWithProvider(provider) {
        this.props.loginWithProvider(provider).then((data) => {
            if (data.payload.errorCode) {
                this.setState({ message: data.payload.errorMessage });
            } else {
                browserHistory.push('/app/profile');
            }
        });
    }

    render() {
        return (
            <div>
                <div className='col-md-4' />
                <div className='col-md-4'>
                    <form id='frmLogin' role='form' onSubmit={this.onFormSubmit}>
                        <p>
                            {this.state.message}
                        </p>
                        <h2>
                            <FormattedMessage {...messages.login_description} />
                        </h2>
                        <div className='form-group'>
                            <label htmlFor='txtEmail'>
                                <FormattedMessage {...messages.email} />
                            </label>
                            <input
                                type='email' className='form-control' id='txtEmail' ref='email'
                                placeholder='Enter email'
                                name='email'
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='txtPass'>
                                <FormattedMessage {...messages.pwd} />
                            </label>
                            <input
                                type='password' className='form-control' id='txtPass' ref='password'
                                placeholder='Password'
                                name='password'
                            />
                        </div>
                        <button type='submit'
                            className='btn btn-default btn-block'
                        >
                            <FormattedMessage {...messages.login_btn} />
                        </button>
                        <br />
                        <h5>
                            <Link to='/app/reset'>
                                <FormattedMessage {...messages.forgot_pwd} />
                            </Link>
                        </h5>
                        <a href='#' className='btn btn-block btn-social btn-facebook'
                            onClick={() => {
                                this.loginWithProvider('facebook');
                            }}
                            data-provider='facebook'
                        >
                            <span className='fa fa-facebook' />
                            <FormattedMessage {...messages.login_with} />&nbsp;Facebook
                        </a>

                        <a href='#' className='btn btn-block btn-social btn-twitter'
                            onClick={() => {
                                this.loginWithProvider('twitter');
                            }}
                            data-provider='twitter'
                        >
                            <span className='fa fa-twitter' />
                            <FormattedMessage {...messages.login_with} />&nbsp;Twitter
                        </a>

                        <a href='#' className='btn btn-block btn-social btn-google'
                            onClick={() => {
                                this.loginWithProvider('google');
                            }}
                            data-provider='google'
                        >
                            <span className='fa fa-google' />
                            <FormattedMessage {...messages.login_with} />&nbsp;Google

                        </a>
                    </form>
                </div>
            </div>
        );
    }

}

UserLogin.propTypes = {
    loginUser        : React.PropTypes.func.isRequired,
    fetchUser        : React.PropTypes.func.isRequired,
    loginWithProvider: React.PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loginUser,
        fetchUser,
        loginWithProvider
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(UserLogin);
