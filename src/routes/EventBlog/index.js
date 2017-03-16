import BlogContainer from './containers/BlogContainer';


export default (store) => {
    return ({
        path     : 'blog',
        component: BlogContainer
    });
};
