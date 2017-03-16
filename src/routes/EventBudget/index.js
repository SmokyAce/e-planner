import BudjetContainer from './containers/BudjetContainer';


export default (store) => {
    return ({
        path     : 'budjet',
        component: BudjetContainer
    });
};
