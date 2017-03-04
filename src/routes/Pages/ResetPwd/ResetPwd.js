import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetPasswordEmail } from '../../App/modules/user';

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
                this.setState({ message: 'Please see your email!' });
            }
        });
    }

    render() {
        const { messages } = this.props.locale;

        return (
            <div className='col-md-4'>
                <form role='form' onSubmit={this.onFormSubmit}>
                    <h4>{this.state.message}</h4>
                    <div className='form-group'>
                        <label htmlFor='txtEmail'>{ messages['app.email'] }</label>
                        <input type='email' className='form-control' id='txtEmail' ref='email'
                            placeholder='Enter email' name='email'
                        />
                    </div>
                    <button type='submit' className='btn btn-default btn-block'>
                        { messages['app.reset-pwd.btn'] }
                    </button>
                </form>
            </div>

        );
    }
}

ResetPassword.propTypes = {
    locale            : React.PropTypes.object.isRequired,
    resetPasswordEmail: React.PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        resetPasswordEmail
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        locale: state.locale
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
