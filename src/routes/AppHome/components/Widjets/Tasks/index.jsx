import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';


class Tasks extends React.Component {
    render() {
        return (
            <div className='widjet-box'>
                <span><FormattedMessage {...messages.desc} /></span>
                <div className='widjet-data'>
                    <span>0</span>
                </div>
            </div>
        );
    }
}

export default Tasks;
