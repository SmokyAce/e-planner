import React from 'react';
import PropTypes from 'prop-types';


const defaultStyle = { fontSize: '20pt' };

const H1 = ({ children, style }) => {
    const elStyle = { ...defaultStyle, ...style };

    return (
        <span style={elStyle}>
            {children}
        </span>
    );
};

H1.propTypes = {
    children: PropTypes.element,
    style   : PropTypes.object
};

export default H1;
