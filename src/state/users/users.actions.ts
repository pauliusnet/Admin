import { GetUserDto } from '../../api';
import { ActionType, SetUsersAction } from './users.actions.types';

export const setUsers = (users: GetUserDto[]): SetUsersAction => ({
    type: ActionType.setUsers,
    payload: users,
});
