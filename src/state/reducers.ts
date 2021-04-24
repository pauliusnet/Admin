import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducer';
import { GlobalState } from './global-state';
import tricksReducer from './tricks/tricks.reducer';

export default combineReducers<GlobalState>({
    auth: authReducer,
    tricks: tricksReducer,
});
