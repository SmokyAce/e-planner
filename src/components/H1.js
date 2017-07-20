import React from 'react';
import PropTypes from 'prop-types';


const H1 = ({ children }) => (
    <span style={{ paddingTop: '20px', fontSize: '20pt' }}>
        {children}
    </span>
);

H1.propTypes = {
    children: PropTypes.element
};

export default H1;
