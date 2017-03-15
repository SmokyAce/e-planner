import React from 'react';
import AppNavPanel from './AppNavPanel';


const AppEvent = ({ children, params }) => {
    return (
        <div>
            <AppNavPanel params={params} />
            <br />
            { children }
        </div>

    );
};

AppEvent.propTypes = {
    children: React.PropTypes.element,
    params  : React.PropTypes.object
};

export default AppEvent;
