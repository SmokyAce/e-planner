import React, { PropTypes } from 'react';
import Checkbox from './Checkbox';

import { addServiceToEvent } from '../../modules/events';


const Services = ({ dispatch, formState }) => {
    const services = [
        'Counter', 'Todos', 'Guests', 'Budjet', 'Timing', 'Contractors', 'Blog', 'Quiz', 'Notebook'
    ];

    const onChange = (service) => {
        dispatch(addServiceToEvent(service));
    };

    if (formState.get('eventName') === '') return <s />;

    return (
        <div>
            { services.map((service) => {
                const isChecked = formState.get('services').includes(service);

                return (
                    <Checkbox isChecked={isChecked} value={service} onChange={onChange} key={service} />
                );
            })}
        </div>
    );
};

Services.propTypes = {
    dispatch : PropTypes.func.isRequired,
    formState: PropTypes.object
};

export default Services;
