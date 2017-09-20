import React from 'react';
import PropTypes from 'prop-types';

import RadioButton from './RadioButton';
import './Filters.scss';


const Filters = ({ filter, onClick }) => {
    return (
        <form className='text-center'>
            <RadioButton isChecked={filter === 'SHOW_ALL'} value='SHOW_ALL' name='filters' filterName='All'
                onChange={onClick}
            />
            <RadioButton isChecked={filter === 'SHOW_ACTIVE'} value='SHOW_ACTIVE' name='filters' filterName='Active'
                onChange={onClick}
            />
            <RadioButton isChecked={filter === 'SHOW_COMPLETED'} value='SHOW_COMPLETED' name='filters'
                filterName='Complete' onChange={onClick}
            />
        </form>
    );
};

Filters.propTypes = {
    filter : PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Filters;

