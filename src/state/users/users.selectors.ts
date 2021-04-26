import { GetUserDto, TrickDto } from '../../api';
import { GlobalState } from '../global-state';

export const usersSelector = (state: GlobalState): GetUserDto[] => state.users.usersList;
