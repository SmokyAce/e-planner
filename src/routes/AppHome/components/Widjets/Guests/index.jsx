import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';


class Guests extends React.Component {
    render() {
        return (
            <div className='widjet-box'>
                <span><FormattedMessage {...messages.desc} /></span>
                <div className='widjet-data'>
                    <span style={{ color: 'green' }}>0</span>
                    <span style={{ color: 'red' }}>0</span>
                </div>
            </div>
        );
    }
}

export default Guests;
