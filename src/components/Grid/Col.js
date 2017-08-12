import React from 'react';
import PropTypes from 'prop-types';


const Col = ({ children, md, style }) => (
    <div className={`col-md-${md}`} style={style}>
        {children}
    </div>
);

Col.propTypes = {
    children: PropTypes.element,
    style   : PropTypes.object,
    md      : PropTypes.number.isRequired
};

export default Col;
