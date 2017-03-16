import NotebookContainer from './containers/NotebookContainer';
// import auth from '../../utils/auth';

// Sync route definition
export default (store) => {
    return ({
        path     : 'notebook',
        component: NotebookContainer
    });
};
