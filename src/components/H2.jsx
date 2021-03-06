import React from 'react';
import PropTypes from 'prop-types';


const defaultStyle = { fontSize: '20px' };

const H2 = ({ children, style, className }) => {
    const elStyle = { ...defaultStyle, ...style };

    return (
        <span className={className} style={elStyle}>
            {children}
        </span>
    );
};

H2.propTypes = {
    children : PropTypes.node,
    style    : PropTypes.object,
    className: PropTypes.string
};

export default H2;
