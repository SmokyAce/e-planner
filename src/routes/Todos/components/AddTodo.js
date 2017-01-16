import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../modules/todos';

export const AddTodo = ({ dispatch }) => {
    let input;

    return (
        <div className="input-group">
            <input className="form-control" placeholder="example: buy a suit" ref={ node => { input = node; }}/>
            <span className="input-group-btn">
                <button className="btn btn-default" onClick={() => { dispatch(addTodo(input.value)); input.value = ''; }}>
                    Add todo
                </button>
            </span>
        </div>
    );
};

export default connect()(AddTodo);
