import React from 'react';
import PropTypes from 'prop-types';
import './Spinner.scss';


const defaultStyle = {
    width : '30px',
    height: '30px'
};

export const Spinner = ({ style }) => (<div className='loader' style={{ ...defaultStyle, ...style }} />);

Spinner.propTypes = {
    style: PropTypes.object
};

export default Spinner;
