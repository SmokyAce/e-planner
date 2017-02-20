import React from 'react';

import '../../styles/core.scss';
import './CoreLayout.scss';

import Header from '../../components/Header';

export const CoreLayout = ({ children }) => {
    return (
        <div className='text-center'>
            <Header>{ children }</Header>
            <div className='core-layout__viewport container'>
                { children }
            </div>
        </div>
    );
};

CoreLayout.propTypes = {
    children: React.PropTypes.element.isRequired
};

export default CoreLayout;
