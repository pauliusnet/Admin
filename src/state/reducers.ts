import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducer';
import { GlobalState } from './global-state';

export default combineReducers<GlobalState>({
    auth: authReducer,
});
