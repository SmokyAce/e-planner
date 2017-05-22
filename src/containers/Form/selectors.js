import { createSelector } from 'reselect';


const selectForm = (state) => state.get('form');

const makeSelectFormState = (formId) => createSelector(
    selectForm,
    (formState) => formState.get(formId)
);

export {
    makeSelectFormState
};
