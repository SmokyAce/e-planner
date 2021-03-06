import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { FormattedMessage } from 'react-intl';

import { onEventSettingsNameChange, saveEventSettings } from '../../App/modules/events';
import Services from './Services';
import messages from './messages';

export const Settings = ({ eventEntry, formState, dispatch }) => {
    
    const eventOptions = eventEntry.toJS();
    
    const onChange = e => {
        dispatch(onEventSettingsNameChange(e.target.value));
    };

    const onSaveButtonClick = () => {
        dispatch(saveEventSettings(eventOptions.id, formState.name));
    };

    const eventName = formState.name === '' && !formState.isChanged ? eventOptions.name : formState.name;

    return (
        <div>
            <h3>
                <FormattedMessage {...messages.description} />
            </h3>
            <br />
            <input className='form-control' value={eventName} onChange={onChange} />
            <br />
            <Services
                dispatch={dispatch}
                services={eventOptions.services}
                eventId={eventOptions.id}
                messages={messages}
            />
            <br />
            <button className='btn btn-primary' onClick={onSaveButtonClick}>
                Save
            </button>
        </div>
    );
};

Settings.propTypes = {
    eventEntry: PropTypes.instanceOf(Map),
    formState : PropTypes.object,
    dispatch  : PropTypes.func
};

export default Settings;
