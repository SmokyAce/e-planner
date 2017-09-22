import { asyncComponent } from 'react-async-component';


const AsyncComponent = asyncComponent({
    resolve: () => new Promise(resolve =>
        // Webpack's code splitting API w/naming
        require.ensure([], (require) => {
            resolve(require('../EventCounter/containers/CounterContainer').default);
        }, 'counter')
    )
});

export default AsyncComponent;
