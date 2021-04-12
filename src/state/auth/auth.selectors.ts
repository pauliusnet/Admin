import { GlobalState } from '../global-state';

export const accessTokenSelector = (state: GlobalState) => state.auth.accessToken;
