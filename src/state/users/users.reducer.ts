import { UsersState } from './users.reducer.types';
import { ActionType, AllActions } from './users.actions.types';

const initialState: UsersState = {
    usersList: [],
};

const usersReducer = (state = initialState, action: AllActions): UsersState => {
    switch (action.type) {
        case ActionType.setUsers:
            return {
                ...state,
                usersList: action.payload,
            };
        default:
            return state;
    }
};

export default usersReducer;
