import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/core.scss';
import './CoreLayout.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';


export const CoreLayout = ({ children, loggedIn }) => {
    if (children.props.location && children.props.location.pathname.indexOf('app') >= 0) {
        return (
            <div className='text-center'>
                {children}
            </div>
        );
    }

    return (
        <div className='text-center'>
            <Header loggedIn={loggedIn} />
            <div className='core-layout'>
                {children}
            </div>
            <Footer />
        </div>
    );
};

CoreLayout.propTypes = {
    children: PropTypes.element.isRequired,
    loggedIn: PropTypes.bool.isRequired
};

export default CoreLayout;
