import React from 'react';
import { connect } from 'react-redux';
import { FormattedDate } from 'react-intl';
import './HomeView.scss';

export const HomeView = ({ messages }) => {
    return (
        <div>
            <h4>{messages['app.greeting']}</h4>
            <FormattedDate value={Date.now()} />
            <img
                alt='This is a duck, because Redux!'
                className='duck'
                src='/img/Duck.jpg'
            />
        </div>
    );
};

HomeView.propTypes = {
    messages: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        messages: state.getIn(['locale', 'messages']).toJS()
    };
};

export default connect(mapStateToProps)(HomeView);
