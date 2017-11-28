import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { isEqual } from 'lodash';

class Budjet extends React.Component {
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

Budjet.propTypes = {};

export default Budjet;
