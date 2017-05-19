import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import './ProfileLayout.scss';


export const ProfileLayout = ({ children }) => {
    return (
        <div>
            <div className='col-sm-3 col-md-2 text-left profile-panel'>
                <h3>Profile</h3>
                <em><h6>GENERAL</h6></em>
                <li><Link to='/app/profile'>Account serttings</Link></li>
                <li><Link to='/app/profile/change-email'>Change email address</Link></li>
                <li><Link to='/app/profile/change-pwd'>Change password</Link></li>
                <em><h6>SERVICES</h6></em>
                <li><Link to='/app/profile'>Tasks</Link></li>
                <li><Link to='/app/profile'>Budjet</Link></li>
                <li><Link to='/app/profile'>Guests</Link></li>
                <li><Link to='/app/profile'>Blog</Link></li>
                <li><Link to='/app/profile'>Guests</Link></li>
            </div>
            <div className='col-sm-9 col-md-10 text-left'>
                { children }
            </div>
        </div>
    );
};

ProfileLayout.propTypes = {
    children: PropTypes.element
};

export default ProfileLayout;