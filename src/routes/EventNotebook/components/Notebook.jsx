import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';


export const Notebook = () => {
    return (
        <div>
            <h2><FormattedMessage {...messages.description} /></h2>
        </div>
    );
};

Notebook.propTypes = {};

export default Notebook;
