import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchUser, updateUser } from '../../Planner/modules/user';
import Loading from './loading';
import ChangePassword from './change_password';

import { FormattedMessage } from 'react-intl';
import messages from './messages';


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

        return (
            <div>
                <div className='col-md-4' />
                <div className='col-md-4'>
                    <form id='frmProfile' role='form' onSubmit={this.onFormSubmit}>
                        <h2><FormattedMessage {...messages.profile_description} /></h2>
                        <p>{this.state.message}</p>
                        <br />
                        <div className='form-group'>
                            <label htmlFor='email'><FormattedMessage {...messages.email} /></label>
                            <input type='text' defaultValue={this.props.currentUser.email} className='form-control'
                                id='email' ref='email' placeholder='Email' name='email'
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='displayName'><FormattedMessage {...messages.display_name} /></label>
                            <input type='text' defaultValue={this.props.currentUser.displayName}
                                className='form-control'
                                ref='displayName' id='displayName' placeholder='Display name' name='displayName'
                            />
                        </div>
                        <button type='submit' className='btn btn-primary'>
                            <FormattedMessage {...messages.update_btn} />
                        </button>
                    </form>
                    <ChangePassword {...{ messages }} />
                </div>
            </div>
        );
    }

}

UserProfile.propTypes = {
    currentUser: React.PropTypes.object,
    fetchUser  : React.PropTypes.func.isRequired,
    updateUser : React.PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchUser, updateUser }, dispatch);
}


function mapStateToProps(state) {
    return {
        currentUser: state.get('currentUser')
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
