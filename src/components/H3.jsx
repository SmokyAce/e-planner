import React from 'react';
import PropTypes from 'prop-types';


const defaultStyle = { fontSize: '16px' };

const H3 = ({ children, style, className }) => {
    const elStyle = { ...defaultStyle, ...style };

    return (
        <span className={className} style={elStyle}>
            {children}
        </span>
    );
};

H3.propTypes = {
    children : PropTypes.node,
    style    : PropTypes.object,
    className: PropTypes.string
};

export default H3;
