import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import { registerRequest, loginWithProviderRequest, changeForm } from '../../App/modules/auth';
import { createStructuredSelector } from 'reselect';
import { makeSelectFormState, makeSelectMessage } from '../../App/modules/selectors';

import { FormattedMessage } from 'react-intl';
import messages from '../messages';

class UserRegister extends Component {

    constructor(props) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.loginWithProvider = this.loginWithProvider.bind(this);
        this._changeEmail = this._changeEmail.bind(this);
        this._changePassword = this._changePassword.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();
        this.props.dispatch(
            registerRequest({
                email   : this.props.formState.get('email'),
                password: this.props.formState.get('password')
            })
        );
    }

    loginWithProvider(provider) {
        this.props.dispatch(loginWithProviderRequest(provider));
    }

    _changeEmail(event) {
        this._emitChange(this.props.formState.set('email', event.target.value));
    }

    _changePassword(event) {
        this._emitChange(this.props.formState.set('password', event.target.value));
    }

    _emitChange(newFormState) {
        this.props.dispatch(changeForm(newFormState));
    }

    render() {
        const { formState, message } = this.props;

        return (
            <div>
                <div className='col-md-4' />
                <div className='col-md-4'>
                    <form id='frmRegister' role='form' onSubmit={this.onFormSubmit}>
                        <p>{message}</p>
                        <h2><FormattedMessage {...messages.register_description} /></h2>
                        <div className='form-group'>
                            <label htmlFor='txtEmail'>
                                <FormattedMessage {...messages.email} />
                            </label>
                            <input type='email' className='form-control' id='txtEmail' placeholder='Enter email'
                                name='email' value={formState.get('email')} onChange={this._changeEmail}
                            />

                        </div>
                        <div className='form-group'>
                            <label htmlFor='txtPass'>
                                <FormattedMessage {...messages.pwd} />
                            </label>
                            <input type='password' className='form-control' id='txtPass' placeholder='password'
                                name='password' value={formState.get('password')} onChange={this._changePassword}
                            />
                        </div>
                        <button type='submit' className='btn btn-primary btn-block'>
                            <FormattedMessage {...messages.register_btn} />
                        </button>
                        <br /><br />

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


UserRegister.propTypes = {
    formState: PropTypes.instanceOf(Immutable.Map),
    message  : PropTypes.string,
    dispatch : PropTypes.func.isRequired
};

const mapStateToProps = state => createStructuredSelector({
    formState: makeSelectFormState(),
    message  : makeSelectMessage()
});

export default connect(mapStateToProps, null)(UserRegister);
