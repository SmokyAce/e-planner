import React from 'react';

import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import './Filters.scss';

const Filters = ({ filter, onClick }) => {
    return (
        <form>
            <RadioButtonGroup className='text-left radio-button-group'
                name='Filters'
                defaultSelected={filter}
                onChange={(e, value) => {
                    onClick(value);
                }}
            >
                <RadioButton
                    value='SHOW_ALL'
                    label='All'
                    checkedIcon={<ActionFavorite />}
                    uncheckedIcon={<ActionFavoriteBorder />}
                />
                <RadioButton value='SHOW_ACTIVE' label='Active' />
                <RadioButton value='SHOW_COMPLETED' label='Complete' />
            </RadioButtonGroup>
        </form>
    );
};

Filters.propTypes = {
    filter : React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
};

export default Filters;

