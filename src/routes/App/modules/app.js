import { combineReducers } from 'redux-immutable';
// reduces
import status from './status';
import sidebar from './sidebar';
import user from './users';
import events from './events';


export default combineReducers({
    status,
    sidebar,
    user,
    events
});
