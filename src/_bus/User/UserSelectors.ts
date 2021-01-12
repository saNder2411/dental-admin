import { createSelector } from 'reselect';
// Types
import { GlobalState } from '../../_init';

export const selectUser = ({ User }: GlobalState) => User.user;

export const selectMemoUser = () => createSelector(selectUser, (user) => user);
