import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router';
import './ProfileLayout.scss';

class ProfileLayout extends React.Component {
    render() {
        return <div className='flexbox-column'>{this.props.children}</div>;
    }
}

ProfileLayout.propTypes = {
    children: PropTypes.element
};

export default ProfileLayout;
