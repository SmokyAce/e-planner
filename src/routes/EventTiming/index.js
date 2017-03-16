import TimingContainer from './containers/TimingContainer';
// import auth from '../../utils/auth';

// Sync route definition
export default (store) => {
    return ({
        path     : 'timing',
        component: TimingContainer
    });
};
