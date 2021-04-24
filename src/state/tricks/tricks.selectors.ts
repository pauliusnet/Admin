import { TrickDto } from '../../api';
import { GlobalState } from '../global-state';

export const tricksSelector = (state: GlobalState): TrickDto[] => state.tricks.trickList;
