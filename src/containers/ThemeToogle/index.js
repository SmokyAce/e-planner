// components
import { connect } from 'react-redux';
import ThemeToogle from '../../components/ThemeToogle';
// selectors
import { createSelector } from 'reselect';
import { makeSelectTheme } from '../../routes/App/modules/selectors';
// actions
import { bindActionCreators } from 'redux';
import { updateTheme } from '../../routes/App/modules/theme';

const mapStateToProps = createSelector(makeSelectTheme(), theme => ({ theme }));

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            updateTheme
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ThemeToogle);
