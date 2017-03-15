import React from 'react';
import AppNavPanel from '../../App/components/AppNavPanel';

const AppEvent = ({ children, params }) => {
    return (
        <div>
            <AppNavPanel params={params}/>
            <br/>
            { children }
        </div>

    )
};

export default AppEvent;