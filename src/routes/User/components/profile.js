import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchUser, updateUser } from '../../../store/reducers/user';
import Loading from './loading';
import ChangePassword from './change_password';

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.props.fetchUser();
        this.state = {
            message: ''
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();
        const email = this.refs.email.value;
        const displayName = this.refs.displayName.value;

        this.props.updateUser({ email, displayName }).then((data) => {
            if (data.payload.errorCode) {
                this.setState({ message: data.payload.errorMessage });
            } else {
                this.setState({
                    message: 'Updated successfuly!'
                });
            }
        }
        );
    }

    render() {
        if (!this.props.currentUser) {
            return <Loading />;
        }

        const { messages } = this.props.locale;

        return (
            <div>
                <div className='col-md-4' />
                <div className='col-md-4'>
                    <form id='frmProfile' role='form' onSubmit={this.onFormSubmit}>
                        <h2>{messages['app.profile.description']}</h2>
                        <p>{this.state.message}</p>
                        <br />
                        <div className='form-group'>
                            <label htmlFor='email'>{messages['app.email']}</label>
                            <input type='text' defaultValue={this.props.currentUser.email} className='form-control'
                                id='email' ref='email' placeholder='Email' name='email'
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='displayName'>{messages['app.profile.display-name']}</label>
                            <input type='text' defaultValue={this.props.currentUser.displayName}
                                className='form-control'
                                ref='displayName' id='displayName' placeholder='Display name' name='displayName'
                            />
                        </div>
                        <button type='submit' className='btn btn-primary'>{messages['app.profile.update-btn']}</button>
                    </form>
                    <ChangePassword />
                </div>
            </div>
        );
    }

}

UserProfile.propTypes = {
    locale     : React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.object.isRequired,
    fetchUser  : React.PropTypes.func.isRequired,
    updateUser : React.PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchUser, updateUser }, dispatch);
}


function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        locale     : state.locale
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
