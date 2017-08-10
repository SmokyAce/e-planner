import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/core.scss';
import './CoreLayout.scss';


class CoreLayout extends React.Component {
    render = () => (
        <div className='text-center core-layout'>
            {this.props.children}
        </div>
    );
}

CoreLayout.propTypes = {
    children: PropTypes.element.isRequired
};

export default CoreLayout;
