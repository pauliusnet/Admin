import { TrickDto } from '../../api';

export enum ActionType {
    setTricks = 'TRICKS/SET_TRICKS',
}

export interface SetTricksAction {
    type: ActionType;
    payload: TrickDto[];
}

export type AllActions = SetTricksAction;
