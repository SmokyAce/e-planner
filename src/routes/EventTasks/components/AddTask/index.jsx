import React, { Component } from 'react';
import PropTypes from 'prop-types';
// components
import { Field, reduxForm } from 'redux-form/immutable';
import RaisedButton from 'material-ui/RaisedButton';
import ReduxFormTextField from '../../../../components/Form/ReduxFormTextField';
import Error from '../../../../components/Indicators/Error';
import { FormattedMessage } from 'react-intl';

import validate from './validate';
import messages from './messages';

const renderTextField = props => {
    const { meta } = props;

    return <ReduxFormTextField {...props} formattedError={<FormattedMessage {...messages[meta.error]} />} />;
};

renderTextField.propTypes = {
    meta: PropTypes.object
};

class AddTask extends Component {
    render() {
        const { showComponent, handleSubmit, error } = this.props;

        if (!showComponent) {
            return null;
        }

        return (
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex' }}>
                    <Field
                        name='description'
                        component={renderTextField}
                        label={<FormattedMessage {...messages.description} />}
                    />
                    <RaisedButton
                        type='submit'
                        label={<FormattedMessage {...messages.save} />}
                        style={{ maxContent: 'max-content', marginTop: 'auto', marginBottom: '8px' }}
                        primary
                    />
                </div>
                {error !== undefined && <Error message={error} />}
            </form>
        );
    }
}

AddTask.propTypes = {
    showComponent: PropTypes.bool,
    handleSubmit : PropTypes.func,
    error        : PropTypes.string
};

export default reduxForm({
    form  : 'AddTask',
    fields: ['description', 'plannedDate'],
    validate
})(AddTask);
