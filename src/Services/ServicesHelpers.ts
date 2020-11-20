// Types
import { APIServicesDataItem, ServicesDataItem, OfferIcons } from './ServicesTypes';

export const transformData = (apiResults: APIServicesDataItem[]): ServicesDataItem[] =>
  apiResults.map((item) => ({ ...item, OfferIconName: OfferIcons.Tooth }));

export const transformDataItem = (apiResult: APIServicesDataItem): ServicesDataItem => ({
  ...apiResult,
  OfferIconName: OfferIcons.Tooth,
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
