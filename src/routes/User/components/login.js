import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser, fetchUser, loginWithProvider } from '../../../store/reducers/user';


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
                browserHistory.push('/user/profile');
            }
        }
        );
    }

    loginWithProvider(provider) {
        this.props.loginWithProvider(provider).then((data) => {
            if (data.payload.errorCode) {
                this.setState({ message: data.payload.errorMessage });
            } else {
                browserHistory.push('/user/profile');
            }
        });
    }

    render() {
        const { messages } = this.props.locale;

        return (
            <div className='col-md-4'>
                <form id='frmLogin' role='form' onSubmit={this.onFormSubmit}>
                    <p>
                        {this.state.message}
                    </p>
                    <h2>{ messages['app.login.description'] }</h2>
                    <div className='form-group'>
                        <label htmlFor='txtEmail'>{ messages['app.email'] }</label>
                        <input
                            type='email' className='form-control' id='txtEmail' ref='email' placeholder='Enter email'
                            name='email'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='txtPass'>{ messages['app.pwd'] }</label>
                        <input
                            type='password' className='form-control' id='txtPass' ref='password' placeholder='Password'
                            name='password'
                        />
                    </div>
                    <button type='submit' className='btn btn-default btn-block'>{ messages['app.login.btn'] }</button>
                    <br />
                    <h5><Link to='/user/reset'>{ messages['app.login.forgot-pwd'] }</Link></h5>

                    <a href='#' className='btn btn-block btn-social btn-facebook'
                        onClick={() => {
                            this.loginWithProvider('facebook');
                        }}
                        data-provider='facebook'
                    >
                        <span className='fa fa-facebook' />
                        { `${messages['app.login.with']} Facebook` }
                    </a>

                    <a href='#' className='btn btn-block btn-social btn-twitter'
                        onClick={() => {
                            this.loginWithProvider('twitter');
                        }}
                        data-provider='twitter'
                    >
                        <span className='fa fa-twitter' />
                        { `${messages['app.login.with']} Twitter` }
                    </a>

                    <a href='#' className='btn btn-block btn-social btn-google'
                        onClick={() => {
                            this.loginWithProvider('google');
                        }}
                        data-provider='google'
                    >
                        <span className='fa fa-google' />
                        { `${messages['app.login.with']} Google` }
                    </a>
                </form>
            </div>

        );
    }

}

UserLogin.propTypes = {
    locale           : React.PropTypes.object.isRequired,
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

function mapStateToProps(state) {
    return {
        locale: state.locale
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
