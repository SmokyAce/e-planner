import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';

const SmartLink = props => {
    return (
        <Link
            {...props}
            onClick={e => {
                if (e.metaKey || e.ctrlKey) return;
                e.preventDefault();
                if (window.swUpdate) return (window.location = props.to);
                return browserHistory.push(props.to);
            }}
        >
            {props.children}
        </Link>
    );
};

SmartLink.propTypes = {
    to      : PropTypes.string.isRequired,
    children: PropTypes.node
};

export default SmartLink;
