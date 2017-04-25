import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectCurrentUser, makeSelectMessage, makeSelectFormState } from '../App/modules/selectors';

import { updateUserInfoRequest, changeForm } from '../App/modules/auth/actions';
import Loading from './Loading';
import ChangePassword from './ChangePassword';

import { FormattedMessage } from 'react-intl';
import messages from './messages';


class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this._changeEmail = this._changeEmail.bind(this);
        this._changeDisplayName = this._changeDisplayName.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();
        this.props.dispatch(
            updateUserInfoRequest({
                email      : this.props.formState.get('email'),
                displayName: this.props.formState.get('displayName')
            })
        );
    }

    _changeEmail(event) {
        this._emitChange(this.props.formState.set('email', event.target.value));
    }

    _changeDisplayName(event) {
        this._emitChange(this.props.formState.set('displayName', event.target.value));
    }

    _emitChange(newFormState) {
        this.props.dispatch(changeForm(newFormState));
    }


    render() {
        const { currentUser, message, dispatch, formState } = this.props;

        if (!currentUser) {
            return <Loading />;
        }

        return (
            <div>
                <div className='col-md-4' />
                <div className='col-md-4'>
                    <form id='frmProfile' role='form' onSubmit={this.onFormSubmit}>
                        <h2><FormattedMessage {...messages.profile_description} /></h2>
                        <p>{message}</p>
                        <br />
                        <div className='form-group'>
                            <label htmlFor='email'><FormattedMessage {...messages.email} /></label>
                            <input type='email' className='form-control' id='txtEmail' placeholder='Email'
                                name='email' defaultValue={currentUser.email} onChange={this._changeEmail}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='displayName'><FormattedMessage {...messages.display_name} /></label>
                            <input type='text' className='form-control' id='displayName' placeholder='Display name'
                                name='displayName' defaultValue={currentUser.displayName}
                                onChange={this._changeDisplayName}
                            />
                        </div>
                        <button type='submit' className='btn btn-primary'>
                            <FormattedMessage {...messages.update_btn} />
                        </button>
                    </form>
                    <ChangePassword {...{ messages, dispatch, formState, message }} />
                </div>
            </div>
        );
    }

}

UserProfile.propTypes = {
    currentUser: PropTypes.object,
    formState  : PropTypes.object,
    message    : PropTypes.string,
    dispatch   : PropTypes.func.isRequired
};

const mapStateToProps = state => createStructuredSelector({
    currentUser: makeSelectCurrentUser(),
    formState  : makeSelectFormState(),
    message    : makeSelectMessage()
});

export default connect(mapStateToProps, null)(UserProfile);

