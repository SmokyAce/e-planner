import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { onEventSettingsNameChange, saveEventSettings } from '../../App/modules/events/actions';
import Services from './Services';
import messages from './messages';


export const Settings = ({ eventOptions, formState, dispatch }) => {
    const onChange = (e) => {
        dispatch(onEventSettingsNameChange(e.target.value));
    };

    const onSaveButtonClick = () => {
        dispatch(saveEventSettings(eventOptions.id, formState.name));
    };

    const eventName = (formState.name === '' && !formState.isChanged) ? eventOptions.name : formState.name;

    return (
        <div>
            <h3><FormattedMessage {...messages.description} /></h3>
            <br />
            <input className='form-control' value={eventName}
                onChange={onChange}
            />
            <br />
            <Services dispatch={dispatch}
                services={eventOptions.services}
                eventId={eventOptions.id}
                messages={messages}
            />
            <br />
            <button className='btn btn-primary'
                onClick={onSaveButtonClick}
            >
                Save
            </button>
        </div>
    );
};

Settings.propTypes = {
    eventOptions: PropTypes.object,
    formState   : PropTypes.object,
    dispatch    : PropTypes.func
};

export default Settings;
