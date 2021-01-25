import { createSelector } from 'reselect';
// Types
import { RootState } from '../../_init';

export const getUser = ({ User }: RootState) => User.user;

export const selectMemoUser = () => createSelector(getUser, (user) => user);
