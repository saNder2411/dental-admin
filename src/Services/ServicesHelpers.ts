// Types
import { APIServicesDataItem, ServicesDataItem } from './ServicesTypes';

export const transformDataItemForAPI = ({ ID, __metadata, ...others }: ServicesDataItem): APIServicesDataItem => {
  const startID = __metadata.id.lastIndexOf(`(`) + 1;
  const newID = `${__metadata.id.slice(0, startID)}${ID})`;
  return {
    ...others,
    ID,
    Id: ID,
    id: ID,
    __metadata: { ...__metadata, id: newID },
  };
};

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
