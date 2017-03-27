import DeleteContainer from './containers/DeleteContainer';


export default (store) => {
    return ({
        path     : 'delete',
        component: DeleteContainer
    });
};
