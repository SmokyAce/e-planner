import React, { Component } from 'react';

class Planner extends Component {

    render = () => {
        return (
            <div>
                <button className='btn' onClick={this.props.onSetOpen}>
                    Open
                </button>
                Welcome to Event Planner!
            </div>
        );
    }
}

Planner.propTypes = {
    onSetOpen: React.PropTypes.func
};

export default Planner;

