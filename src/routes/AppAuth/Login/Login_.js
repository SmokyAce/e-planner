import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { loginRequest, loginWithProviderRequest, changeForm } from '../../App/modules/auth/actions';
import { createStructuredSelector } from 'reselect';
import { makeSelectFormState, makeSelectMessage } from '../../App/modules/selectors';

import { FormattedMessage } from 'react-intl';
import messages from '../messages';
import AuthForm from '../AuthForm.js';
import SocialButton from '../SocialButton.js';

class UserLogin extends Component {

    render() {
        const { formState, message, dispatch } = this.props;

        messages.description = messages.login_description;
        messages.submit = messages.login_btn;

        return (
            <div>
                <div className='col-md-4'/>
                <AuthForm email={formState.get('email')} password={formState.get('password')} messages={messages}
                          onSubmit={loginRequest} error={message} dispatch={dispatch} formState={formState}>
                    <br />
                    <h5>
                        <Link to='/reset'>
                            <FormattedMessage {...messages.forgot_pwd} />
                        </Link>
                    </h5>
                    <SocialButton name="Facebook" message={messages.login_with}
                                  onButtonClick={loginWithProviderRequest}/>
                    <a href='#' className='btn btn-block btn-social btn-facebook'
                       onClick={() => {
                           this.loginWithProvider('facebook');
                       }}
                       data-provider='facebook'
                    >
                        <span className='fa fa-facebook'/>
                        <FormattedMessage {...messages.login_with} />&nbsp;Facebook
                    </a>
                    <a href='#' className='btn btn-block btn-social btn-twitter'
                       onClick={() => {
                           this.loginWithProvider('twitter');
                       }}
                       data-provider='twitter'
                    >
                        <span className='fa fa-twitter'/>
                        <FormattedMessage {...messages.login_with} />&nbsp;Twitter
                    </a>
                    <a href='#' className='btn btn-block btn-social btn-google'
                       onClick={() => {
                           this.loginWithProvider('google');
                       }}
                       data-provider='google'
                    >
                        <span className='fa fa-google'/>
                        <FormattedMessage {...messages.login_with} />&nbsp;Google

                    </a>
                </AuthForm>
            </div>
        );
    }

}

UserLogin.propTypes = {
    formState: PropTypes.instanceOf(Map),
    message  : PropTypes.string,
    dispatch : PropTypes.func.isRequired
};

const mapStateToProps = state => createStructuredSelector({
    formState: makeSelectFormState(),
    message  : makeSelectMessage()
});

export default connect(mapStateToProps, null)(UserLogin);
