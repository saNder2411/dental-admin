import { sp } from '@pnp/sp';

// Types
import { EffectiveBasePermissions, UserRoles, UserInfo } from './UserTypes';

export const UserRolesMap = {
  Owner: 25.26,
  Manager: 10.12,
};

export const transformAPIData = ({ Low, High }: EffectiveBasePermissions): UserInfo => {
  const isOwner = sp.web.hasPermissions({ Low: +Low, High: +High }, UserRolesMap.Owner);
  const isManager = sp.web.hasPermissions({ Low: +Low, High: +High }, UserRolesMap.Manager);

  return { role: isOwner ? UserRoles.Owner : isManager ? UserRoles.Manager : UserRoles.NotAdmin };
};
