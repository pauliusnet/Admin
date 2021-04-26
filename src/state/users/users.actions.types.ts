import { GetUserDto } from '../../api';

export enum ActionType {
    setUsers = 'USERS/SET_USERS',
}

export interface SetUsersAction {
    type: ActionType;
    payload: GetUserDto[];
}

export type AllActions = SetUsersAction;
