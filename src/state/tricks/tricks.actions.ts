import { TrickDto } from '../../api';
import { ActionType, SetTricksAction } from './tricks.actions.types';

export const setTricks = (trickList: TrickDto[]): SetTricksAction => ({
    type: ActionType.setTricks,
    payload: trickList,
});
