import GuestsContainer from './containers/GuestsContainer';


export default (store) => {
    return ({
        path     : 'guests',
        component: GuestsContainer
    });
};
