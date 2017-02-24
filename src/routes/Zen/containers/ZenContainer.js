/* @flow */
import { connect } from 'react-redux';
import { fetchZen, saveCurrentZen } from '../modules/zen';

import Zen from '../components/Zen';

// import type { ZenObject } from '../interfaces/zen';

const mapActionCreators: { fetchZen: Function, saveCurrentZen: Function } = {
    fetchZen,
    saveCurrentZen
};

const mapStateToProps = (state) => {
    const current = state.getIn(['zen', 'current']);
    const saved = state.getIn(['zen', 'saved']);

    return {
        zen  : state.getIn(['zen', 'zens']).find(zen => zen.id === current),
        saved: state.getIn(['zen', 'zens']).filter(zen => saved.indexOf(zen.id) !== -1)
    };
};

export default connect(mapStateToProps, mapActionCreators)(Zen);
