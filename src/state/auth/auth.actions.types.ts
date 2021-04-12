export enum ActionType {
    accessTokenSet = 'AUTH/ACCESS_TOKEN_SET',
}

export interface SetAccessTokenAction {
    type: ActionType;
    payload: string;
}

export type AllActions = SetAccessTokenAction;
