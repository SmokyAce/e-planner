import React from 'react';
import { connect } from 'react-redux';
import { FormattedDate } from 'react-intl';
import './HomeView.scss';

export const HomeView = ({ locale }) => {
    return (
        <div>
            <h4>{locale.messages['app.greeting']}</h4>
            <FormattedDate value={Date.now()} />
            <img
                alt='This is a duck, because Redux!'
                className='duck'
                src='/img/Duck.jpg'
            />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        locale: state.locale
    };
};

export default connect(mapStateToProps)(HomeView);
