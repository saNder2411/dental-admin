// Types
import { ServiceDataItem, ServiceDataItemForCrtUpdActions } from './ServicesTypes';

export const transformDataItemForAPI = ({ OfferingIconName, RoleSkills, ...others }: ServiceDataItem): ServiceDataItemForCrtUpdActions => ({
  ...others,
  __metadata: { type: 'SP.Data.MetroBP02ListItem' },
});

export const roleSkills = [
  `Active Listening`,
  `Artistic & Creative`,
  `Colouring-Balayage`,
  `Colouring-Base`,
  `Colouring-Ombré`,
  `Consultative`,
  `Decisive & Confident`,
  `First Aid`,
  `Marketing & Promoting`,
  `Patience & Tolerance`,
  `Personal Dexterity`,
  `Physical Stamina`,
  `Problem Solving`,
  `Rapport Building`,
  `Styling-Blunt Cut`,
  `Styling-Chunky`,
  `Styling-Dusting`,
  `Styling-Layering`,
  `Styling-Undercut`,
  `Styling-Wispy`,
  `Time Management`,
];
