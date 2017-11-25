import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { isEqual } from 'lodash';

class Notebook extends Component {
    shouldComponentUpdate = (nextProps, nextState) => !isEqual(nextProps, this.props);

    render() {
        return (
            <div>
                <h2>
                    <FormattedMessage {...messages.description} />
                </h2>
            </div>
        );
    }
}

Notebook.propTypes = {};

export default Notebook;
