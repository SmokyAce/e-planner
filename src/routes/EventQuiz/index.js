import QuizContainer from './containers/QuizContainer';
// import auth from '../../utils/auth';

// Sync route definition
export default (store) => {
    return ({
        path     : 'quiz',
        component: QuizContainer
    });
};
