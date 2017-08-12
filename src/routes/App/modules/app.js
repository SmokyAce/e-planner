import { combineReducers } from 'redux-immutable';
// reduces
import connection from './connection';
import sync from './sync';
import sidebar from './sidebar';
import user from './user';
import events from './events';


export default combineReducers({
    connection,
    sync,
    sidebar,
    user,
    events
});
