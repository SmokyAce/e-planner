import React from 'react';
import { asyncComponent } from 'react-async-component';

const AsyncHome = asyncComponent({
    resolve: () =>
        new Promise(resolve =>
            // Webpack's code splitting API w/naming
            require.ensure(
                [],
                require => {
                    resolve(require('../EventHome/containers/EventHomeContainer').default);
                },
                'home'
            )
        )
});

const AsyncGuests = asyncComponent({
    resolve: () =>
        new Promise(resolve =>
            // Webpack's code splitting API w/naming
            require.ensure(
                [],
                require => {
                    resolve(require('../EventGuests/containers/GuestsContainer').default);
                },
                'guests'
            )
        )
});

const AsyncTasks = asyncComponent({
    resolve: () =>
        new Promise(resolve =>
            // Webpack's code splitting API w/naming
            require.ensure(
                [],
                require => {
                    resolve(require('../EventTasks/containers/EventTasksContainer').default);
                },
                'tasks'
            )
        )
});

const AsyncBudjet = asyncComponent({
    resolve: () =>
        new Promise(resolve =>
            // Webpack's code splitting API w/naming
            require.ensure(
                [],
                require => {
                    resolve(require('../EventBudget/containers/BudjetContainer').default);
                },
                'budjet'
            )
        )
});

const AsyncTiming = asyncComponent({
    resolve: () =>
        new Promise(resolve =>
            // Webpack's code splitting API w/naming
            require.ensure(
                [],
                require => {
                    resolve(require('../EventTiming/containers/TimingContainer').default);
                },
                'timing'
            )
        )
});

const AsyncBlog = asyncComponent({
    resolve: () =>
        new Promise(resolve =>
            // Webpack's code splitting API w/naming
            require.ensure(
                [],
                require => {
                    resolve(require('../EventBlog/containers/BlogContainer').default);
                },
                'blog'
            )
        )
});

const AsyncQuiz = asyncComponent({
    resolve: () =>
        new Promise(resolve =>
            // Webpack's code splitting API w/naming
            require.ensure(
                [],
                require => {
                    resolve(require('../EventQuiz/containers/QuizContainer').default);
                },
                'quiz'
            )
        )
});

const AsyncNotebook = asyncComponent({
    resolve: () =>
        new Promise(resolve =>
            // Webpack's code splitting API w/naming
            require.ensure(
                [],
                require => {
                    resolve(require('../EventNotebook/containers/NotebookContainer').default);
                },
                'notebook'
            )
        )
});

const AsyncSettings = asyncComponent({
    resolve: () =>
        new Promise(resolve =>
            // Webpack's code splitting API w/naming
            require.ensure(
                [],
                require => {
                    resolve(require('../EventSettings/containers/SettingsContainer').default);
                },
                'settings'
            )
        )
});

export default (function A() {
    const services = {
        home    : <AsyncHome />,
        guests  : <AsyncGuests />,
        tasks   : <AsyncTasks />,
        budjet  : <AsyncBudjet />,
        timing  : <AsyncTiming />,
        blog    : <AsyncBlog />,
        quiz    : <AsyncQuiz />,
        notebook: <AsyncNotebook />,
        settings: <AsyncSettings />
    };

    return function B(component, props) {
        return React.cloneElement(services[component], { ...props });
    };
}());
