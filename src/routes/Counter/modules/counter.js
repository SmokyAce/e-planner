// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT';
export const COUNTER_DOUBLE_ASYNC_REQUEST = 'COUNTER_DOUBLE_ASYNC_REQUEST';
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC';


// ------------------------------------
// Actions
// ------------------------------------
export function increment(eventId, value = 1) {
    return {
        type   : COUNTER_INCREMENT,
        payload: { eventId, value }
    };
}

/*  This is a thunk, meaning it is a function that immediately
 returns a function for lazy evaluation. It is incredibly useful for
 creating async actions, especially when combined with redux-thunk! */

export const doubleAsync = (eventId, value) => {
    return {
        type   : COUNTER_DOUBLE_ASYNC_REQUEST,
        payload: { eventId, value }
    };
};
