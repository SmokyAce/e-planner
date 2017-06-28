/* @flow */
// import type {  ZenStateObject } from '../interfaces/zen.js';
import { fromJS } from 'immutable';
// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_ZEN = 'REQUEST_ZEN';
export const RECIEVE_ZEN = 'RECIEVE_ZEN';
export const SAVE_CURRENT_ZEN = 'SAVE_CURRENT_ZEN';

// ------------------------------------
// Actions
// ------------------------------------

export function requestZen() {
    return {
        type: REQUEST_ZEN
    };
}

export function recieveZen(value, current) {
    let newId = current;

    return {
        type   : RECIEVE_ZEN,
        payload: {
            value,
            id: newId++
        }
    };
}

export function saveCurrentZen() {
    return {
        type: SAVE_CURRENT_ZEN
    };
}

export const fetchZen = (current = 0) => {
    return (dispatch) => {
        dispatch(requestZen());

        return fetch('https://api.github.com/zen')
            .then(data => data.text())
            .then(text => dispatch(recieveZen(text, current)));
    };
};

export const actions = {
    requestZen,
    fetchZen,
    saveCurrentZen
};

const ZEN_ACTION_HANDLERS = {

    [REQUEST_ZEN]: (state) => {
        return state.set('fetching', true);
    },
    [RECIEVE_ZEN]: (state, action) => {
        return state.set('zens', state.get('zens').concat(action.payload))
            .set('current', action.payload.id)
            .set('fetching', false);
    },
    [SAVE_CURRENT_ZEN]: (state) => {
        const current = state.get('current');

        return current !== null ? state.set('saved', state.get('saved').concat(current)) : state;
    }
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = fromJS({ fetching: false, current: null, zens: [], saved: [] });

export default function zenReducer(state = initialState, action) {
    const handler = ZEN_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
