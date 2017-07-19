import React from 'react';
import PropTypes from 'prop-types';


const Col = ({ children, md }) => (
    <div className={`col-md-${md}`}>
        {children}
    </div>
);

Col.propTypes = {
    children: PropTypes.element,
    md      : PropTypes.number.isRequired
};

export default Col;
