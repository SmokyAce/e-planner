// components
import GuestsContainer from './containers/GuestsContainer';


// Sync route definition
export default (store) => {
    return ({
        path     : 'guests',
        component: GuestsContainer
    });
};
