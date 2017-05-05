import RemoveContainer from './containers/RemoveContainer';


export default (store) => {
    return ({
        path     : 'delete',
        component: RemoveContainer
    });
};
