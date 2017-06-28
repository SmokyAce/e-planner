import React  from 'react';
import PropTypes from 'prop-types';
import Sidebar from 'react-sidebar';

import './Sidebar.scss';


const HOC = (Component) => {
    class SidebarHOC extends React.Component {
        componentWillMount = () => {
            const mql = window.matchMedia('(min-width: 800px)');

            mql.addListener(this.mediaQueryChanged);
            this.setState({ mql, sidebarDocked: mql.matches });
        };

        componentWillUnmount = () => {
            this.state.mql.removeListener(this.mediaQueryChanged);
        };

        mediaQueryChanged = () => {
            this.props.onSetDocked(!this.state.mql.matches);
        };

        render() {
            return <Component {...this.props} />;
        }
    }
    SidebarHOC.propTypes = {
        onSetDocked: PropTypes.func.isRequired
    };
    return SidebarHOC;
};

export default HOC(Sidebar);
