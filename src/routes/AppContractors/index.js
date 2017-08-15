// components
import ContractorsContainer from './containers/ContractorsContainer';


// Sync route definition
export default (store) => {
    return ({
        path     : 'contractors',
        component: ContractorsContainer
    });
};
