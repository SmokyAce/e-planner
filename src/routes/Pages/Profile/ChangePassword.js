import React from 'react';
import Immutable from 'immutable';
import { FormattedMessage } from 'react-intl';
import { changeUserPwdRequest, setMesssage, changeForm } from '../../App/modules/app';


class ChangePassword extends React.Component {

    constructor(props) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this._changePassword = this._changePassword.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();
        const password       = this.props.formState.get('password'),
              repeatPassword = this.props.formState.get('repeatPassword');

        if (password !== repeatPassword) {
            this.props.dispatch(
                setMesssage('Please password must match!')
            );
            return;
        }
        // dispatch the change user action request
        this.props.dispatch(changeUserPwdRequest(password));
    }

    _changePassword(event) {
        this._emitChange(this.props.formState.set(event.target.name, event.target.value));
    }

    _emitChange(newFormState) {
        this.props.dispatch(changeForm(newFormState));
    }

    render() {
        const { messages, formState, message } = this.props;

        return (
            <form id='ChangePassword' role='form' onSubmit={this.onFormSubmit}>
                <br />
                <h4> <FormattedMessage {...messages.change_description} /></h4>
                <h5> {message} </h5>
                <div className='form-group'>
                    <label htmlFor='password'><FormattedMessage {...messages.new_pwd} /></label>
                    <input type='password' className='form-control' name='password' id='password'
                        value={formState.get('password')} onChange={this._changePassword}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='repeatPassword'><FormattedMessage {...messages.repeat_pwd} /></label>
                    <input type='password' className='form-control' name='repeatPassword' id='repeatPassword'
                        value={formState.get('repeatPassword')} onChange={this._changePassword}
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
    messages : React.PropTypes.object,
    formState: React.PropTypes.instanceOf(Immutable.Map),
    message  : React.PropTypes.string,
    dispatch : React.PropTypes.func
};

export default ChangePassword;
