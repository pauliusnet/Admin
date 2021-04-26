import { AuthState } from './auth/auth.reducer.types';
import { TricksState } from './tricks/tricks.reducer.types';
import { UsersState } from './users/users.reducer.types';

export interface GlobalState {
    auth: AuthState;
    tricks: TricksState;
    users: UsersState;
}
