import { TricksState } from './tricks.reducer.types';
import { ActionType, AllActions } from './tricks.actions.types';

const initialState: TricksState = {
    trickList: [],
};

const tricksReducer = (state = initialState, action: AllActions): TricksState => {
    switch (action.type) {
        case ActionType.setTricks:
            return {
                ...state,
                trickList: action.payload,
            };
        default:
            return state;
    }
};

export default tricksReducer;
