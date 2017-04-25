import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';

import { resetPasswordEmail } from '../../App/modules/auth/actions';
import messages from '../messages';


class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();
        const email = this.refs.email.value;

        this.props.resetPasswordEmail(email).then((data) => {
            if (data.payload.errorCode) {
                this.setState({ message: data.payload.errorMessage });
            } else {
                this.setState({ message: 'Please check your email!' });
            }
        });
    }

    render() {
        return (
            <div>
                <div className='col-md-4' />
                <div className='col-md-4'>
                    <form role='form' onSubmit={this.onFormSubmit}>
                        <h4>{this.state.message}</h4>
                        <div className='form-group'>
                            <label htmlFor='txtEmail'>
                                <FormattedMessage {...messages.email} />
                            </label>
                            <input type='email' className='form-control' id='txtEmail' ref='email'
                                placeholder='Enter email' name='email'
                            />
                        </div>
                        <button type='submit' className='btn btn-primary btn-block'>
                            <FormattedMessage {...messages.reset_pwd_btn} />
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

ResetPassword.propTypes = {
    resetPasswordEmail: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        resetPasswordEmail
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(ResetPassword);
