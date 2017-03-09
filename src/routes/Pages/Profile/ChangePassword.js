import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import { makeSelectCurrentUser } from '../../App/modules/selectors';
import { changePassword } from '../../App/modules/user';

class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state = {
            message: ''
        };
    }

    onFormSubmit(event) {
        event.preventDefault();
        const password = this.refs.password.value;
        const repeatPassword = this.refs.repeatPassword.value;

        if (password !== repeatPassword) {
            this.setState({
                message: 'Please password must match!'
            });
        } else {
            this.props.changePassword(password).then((data) => {
                if (data.payload.errorCode) {
                    this.setState({ message: data.payload.errorMessage });
                } else {
                    this.setState({ message: 'Password was changed!' });
                }
            });
        }
    }

    render() {
        const { messages } = this.props;

        return (
            <form id='ChangePassword' role='form' onSubmit={this.onFormSubmit}>
                <br />
                <h4> <FormattedMessage {...messages.change_description} /></h4>
                <h5> {this.state.message} </h5>
                <div className='form-group'>
                    <label htmlFor='password'><FormattedMessage {...messages.new_pwd} /></label>
                    <input type='password' className='form-control' name='password' ref='password' id='password' />
                </div>
                <div className='form-group'>
                    <label htmlFor='repeatPassword'><FormattedMessage {...messages.repeat_pwd} /></label>
                    <input type='password' className='form-control' name='repeatPassword'
                        ref='repeatPassword' id='repeatPassword'
                    />

                </div>
                <button type='submit' className='btn btn-primary'>
                    <FormattedMessage {...messages.change_pwd_btn} />
                </button>
            </form>
        );
    }

}

ChangePassword.propTypes = {
    currentUser   : React.PropTypes.object.isRequired,
    changePassword: React.PropTypes.func.isRequired,
    messages      : React.PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ changePassword }, dispatch);
}

const mapStateToProps = state => createStructuredSelector({
    currentUser: makeSelectCurrentUser()
    // formState  : makeSelectFormState(),
    // message    : makeSelectMessage()
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
