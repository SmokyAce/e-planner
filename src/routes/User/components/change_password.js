import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changePassword } from '../../../store/reducers/user';

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
        const { messages } = this.props.locale;

        return (
            <form id='ChangePassword' role='form' onSubmit={this.onFormSubmit}>
                <br />
                <h4> { messages['app.change-pwd.description'] } </h4>
                <h5> {this.state.message} </h5>
                <div className='form-group'>
                    <label htmlFor='password'> { messages['app.change-pwd.new-pwd'] } </label>
                    <input type='password' className='form-control' name='password' ref='password' id='password' />
                </div>
                <div className='form-group'>
                    <label htmlFor='repeatPassword'> { messages['app.change-pwd.repeat-pwd'] } </label>
                    <input type='password' className='form-control' name='repeatPassword'
                        ref='repeatPassword' id='repeatPassword'
                    />

                </div>
                <button type='submit' className='btn btn-primary'>{ messages['app.change-pwd.btn'] }</button>
            </form>
        );
    }

}

ChangePassword.propTypes = {
    currentUser   : React.PropTypes.object.isRequired,
    locale        : React.PropTypes.object.isRequired,
    changePassword: React.PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ changePassword }, dispatch);
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        locale     : state.locale
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
