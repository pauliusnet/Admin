import { GlobalState } from '../global-state';

export const accessTokenSelector = (state: GlobalState): string => state.auth.accessToken;
