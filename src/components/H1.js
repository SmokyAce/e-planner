import React from 'react';
import PropTypes from 'prop-types';


const defaultStyle = { fontSize: '20pt' };

const H1 = ({ children, style, className }) => {
    const elStyle = { ...defaultStyle, ...style };

    return (
        <span className={className} style={elStyle}>
            {children}
        </span>
    );
};

H1.propTypes = {
    children : PropTypes.element,
    style    : PropTypes.object,
    className: PropTypes.string
};

export default H1;
