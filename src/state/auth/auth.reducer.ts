import { AuthState } from './auth.reducer.types';
import { ActionType, AllActions } from './auth.actions.types';

const initialState: AuthState = {
    accessToken: '',
};

const authReducer = (state = initialState, action: AllActions): AuthState => {
    switch (action.type) {
        case ActionType.accessTokenSet:
            return {
                ...state,
                accessToken: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;
