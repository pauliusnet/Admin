import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducer';
import { GlobalState } from './global-state';
import tricksReducer from './tricks/tricks.reducer';
import usersReducer from './users/users.reducer';

export default combineReducers<GlobalState>({
    auth: authReducer,
    tricks: tricksReducer,
    users: usersReducer,
});
