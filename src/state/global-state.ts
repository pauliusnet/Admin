import { AuthState } from './auth/auth.reducer.types';
import { TricksState } from './tricks/tricks.reducer.types';

export interface GlobalState {
    auth: AuthState;
    tricks: TricksState;
}
