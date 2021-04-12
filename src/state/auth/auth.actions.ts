import { ActionType, SetAccessTokenAction } from './auth.actions.types';

export const setAccessToken = (accessToken: string): SetAccessTokenAction => ({
    type: ActionType.accessTokenSet,
    payload: accessToken,
});
