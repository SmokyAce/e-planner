import NotFound from './NotFound';


export default (store) => {
    return ({
        path     : '*',
        component: NotFound
    });
};
