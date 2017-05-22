import React  from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeForm } from './modules';
import { createSelector } from 'reselect';
import { makeSelectFormState } from './selectors';


const Form = (Component, config) => {
    class HOC extends React.Component {

        render() {
            const { formState, onInputChange } = this.props;

            const extProps = {
                formState: (formState === undefined) ? config.initialState : formState,
                onInputChange

            };

            return <Component {...extProps} />;
        }
    }

    HOC.propTypes = {
        formState    : PropTypes.instanceOf(Map),
        onInputChange: PropTypes.func
    };

    return HOC;
};

// const withForm = (formId, initialState) => {
//
// };


const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    onInputChange: changeForm
}, dispatch);

const mapStateToProps = (state, ownProps) => createSelector(
    makeSelectFormState(),
    (formState) => ({
        formState
    })
);

export default connect(mapStateToProps, mapDispatchToProps)(Form);
